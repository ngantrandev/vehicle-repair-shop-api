import { Response } from 'express';
import { CustomRequest } from '@/src/types/requests';

import {
    BOOKING_STATE,
    TABLE_NAMES,
    ACCOUNT_STATE,
} from '@/src/configs/constants.config';
import { DistanceMatrix } from '@/src/types/goongmaps';
import { STATUS_CODE } from '@/src/configs/status.codes.config';
import {
    createUserNotification,
    createStaffNotification,
} from '@/src/services/notification.service';
import { sendNotificationToTopic } from '@/src/services/firebase.service';
import {
    isValidInteger,
    selectData,
    excuteQuery,
    sendResponse,
} from '@/src/ultil/ultil.lib';
import { BookingResponse } from '@/src/types/responses';
import { Booking, Staff } from '@/src/types/models';
import { getDistanceMatrix } from '@/src/services/goong.service';

const calculateScore = (min: number, max: number, value: number) => {
    return (value - min) / (max - min);
};

const calculateTotalScore = (
    scorePendingTasks: number,
    scoreDistance: number,
    scoreEstimatedTime: number
) => {
    return (
        0.3 * scorePendingTasks + 0.4 * scoreDistance + 0.3 * scoreEstimatedTime
    );
};

interface StaffStatus {
    staff_id: number;
    pending_tasks: number;
    distance: { text: string; value: number };
    total_estimated_time: number;
    latest_latitude: number;
    latest_longitude: number;
}

interface StaffScore {
    staff_id: number;
    pending_tasks_score: number;
    distance_score: number;
    estimated_time_score: number;
    score: number;
}

export const confirmBooking = async (req: CustomRequest, res: Response) => {
    if (!req.params.booking_id) {
        sendResponse(res, STATUS_CODE.BAD_REQUEST, 'booking_id is required');
        return;
    }

    if (!isValidInteger(req.params.booking_id)) {
        sendResponse(
            res,
            STATUS_CODE.BAD_REQUEST,
            'booking_id must be integer'
        );
        return;
    }

    if (req.body.employee_id && !isValidInteger(req.body.employee_id)) {
        sendResponse(res, STATUS_CODE.BAD_REQUEST, 'staff_id must be integer');
        return;
    }

    try {
        const checkExistBooking = `
         SELECT 
            b.*,
            s.name AS service_name,
            addr.latitude AS address_latitude,
            addr.longitude AS address_longitude
        FROM ${TABLE_NAMES.bookings} AS b
        JOIN ${TABLE_NAMES.services} AS s ON b.service_id = s.id
        INNER JOIN ${TABLE_NAMES.addresses} AS addr ON b.address_id = addr.id
        WHERE b.id = ?
        `;
        const bookingsFound: BookingResponse[] = (await selectData(
            checkExistBooking,
            [req.params.booking_id]
        )) as BookingResponse[];

        if (bookingsFound.length === 0) {
            sendResponse(res, STATUS_CODE.NOT_FOUND, 'booking not found!');
            return;
        }

        const { address_latitude, address_longitude, service_name, user_id } =
            bookingsFound[0];

        const getStaffStatusQuery = `
            SELECT 
                s.id AS staff_id,
                COUNT(b.id) AS pending_tasks,
                CASE 
                    WHEN COUNT(b.id) > 0 THEN g.latitude 
                    ELSE station_addr.latitude 
                END AS latest_latitude,
                CASE 
                    WHEN COUNT(b.id) > 0 THEN g.longitude
                    ELSE station_addr.longitude
                END AS latest_longitude,
                IFNULL(SUM(TIME_TO_SEC(srv.estimated_time)), 0) AS total_estimated_time
            FROM staffs s
            LEFT JOIN bookings b 
                ON s.id = b.staff_id AND b.status NOT IN ('done', 'cancelled')
            LEFT JOIN services srv 
                ON b.service_id = srv.id
            LEFT JOIN (
                SELECT 
                    b.staff_id, 
                    b.address_id,
                    ROW_NUMBER() OVER (PARTITION BY b.staff_id ORDER BY b.created_at DESC) AS row_num
                FROM bookings b
                WHERE b.status NOT IN ('done', 'cancelled')
            ) latest_booking 
                ON s.id = latest_booking.staff_id AND latest_booking.row_num = 1
            LEFT JOIN goong_map_addresses g 
                ON latest_booking.address_id = g.id
            LEFT JOIN service_stations ss 
                ON s.station_id = ss.id
            LEFT JOIN goong_map_addresses station_addr 
                ON ss.address_id = station_addr.id
            WHERE s.active = 1
            GROUP BY s.id, station_addr.latitude, station_addr.longitude, g.latitude, g.longitude;
        `;

        const staffStatus: StaffStatus[] = (await selectData(
            getStaffStatusQuery,
            []
        )) as StaffStatus[];

        const listAddress = staffStatus.map(
            (item: { latest_latitude: number; latest_longitude: number }) => {
                return [[item.latest_latitude, item.latest_longitude]];
            }
        );

        const distanceMatrix: DistanceMatrix = await getDistanceMatrix(
            [[address_latitude, address_longitude]],
            listAddress
        );

        if (!distanceMatrix) {
            return null;
        }

        const data = distanceMatrix.rows[0].elements;

        data.forEach(({ distance }, index) => {
            const { text, value } = distance;
            staffStatus[index].distance = { text, value };
        });

        let maxDistance = 0;
        let maxPendingTasks = 0;
        let maxEstimatedTime = 0;
        let minEstimatedTime = 0;
        let minDistance = 0;
        let minPendingTasks = 0;

        staffStatus.forEach((item) => {
            const { pending_tasks, distance, total_estimated_time } = item;

            if (pending_tasks) {
                if (pending_tasks > maxPendingTasks) {
                    maxPendingTasks = pending_tasks;
                } else if (pending_tasks < minPendingTasks) {
                    minPendingTasks = pending_tasks;
                }
            }

            if (distance) {
                if (distance.value > maxDistance) {
                    maxDistance = distance.value;
                } else if (distance.value < minDistance) {
                    minDistance = distance.value;
                }
            }

            if (total_estimated_time) {
                if (total_estimated_time > maxEstimatedTime) {
                    maxEstimatedTime = total_estimated_time;
                } else if (total_estimated_time < minEstimatedTime) {
                    minEstimatedTime = total_estimated_time;
                }
            }
        });

        const dataScore: StaffScore[] = [];

        staffStatus.forEach((item) => {
            const { staff_id, pending_tasks, distance, total_estimated_time } =
                item;

            const scorePendingTasks = calculateScore(
                minPendingTasks,
                maxPendingTasks,
                pending_tasks
            );
            const scoreDistance = calculateScore(
                minDistance,
                maxDistance,
                distance.value
            );
            const scoreEstimatedTime = calculateScore(
                minEstimatedTime,
                maxEstimatedTime,
                total_estimated_time
            );

            const score = calculateTotalScore(
                scorePendingTasks,
                scoreDistance,
                scoreEstimatedTime
            );

            dataScore.push({
                staff_id,
                pending_tasks_score: scorePendingTasks,
                distance_score: scoreDistance,
                estimated_time_score: scoreEstimatedTime,
                score,
            });
        });

        const dataMinScore = dataScore.reduce((min, current) => {
            return current.score < min.score ? current : min;
        });

        const staffId = dataMinScore.staff_id;

        const updateBooking = `UPDATE ${TABLE_NAMES.bookings} SET status = ?,pre_status = ?, staff_id = ?, note = ?, staff_id = ? WHERE id = ?`;

        await excuteQuery(updateBooking, [
            BOOKING_STATE.accepted,
            BOOKING_STATE.accepted,
            req.body.employee_id,
            req.body.note,
            staffId,
            req.params.booking_id,
        ]);

        const title = 'Xác nhận lịch hẹn';
        const message = `Lịch hẹn ${service_name} đã được xác nhận. Nhân viên sẽ sớm di chuyển.
Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!`;
        const userId = user_id;
        await createUserNotification(userId, title, message);
        await sendNotificationToTopic(title, message, `customer_${userId}`);

        if (staffId) {
            const staffNotiTitle = 'Bạn có nhiệm vụ mới';
            const staffMessage = `Bạn có lịch hẹn ${service_name} mới cần thực hiện!`;
            await createStaffNotification(
                staffId,
                staffNotiTitle,
                staffMessage
            );

            await sendNotificationToTopic(
                staffNotiTitle,
                staffMessage,
                `staff_${staffId}`
            );
        }

        sendResponse(res, STATUS_CODE.OK, 'booking confirmed successfully!');
    } catch (error) {
        sendResponse(
            res,
            STATUS_CODE.INTERNAL_SERVER_ERROR,
            'something went wrong' + error
        );
    }
};

export const assignBookingToEmployee = async (
    req: CustomRequest,
    res: Response
) => {
    if (!req.params.booking_id) {
        sendResponse(res, STATUS_CODE.BAD_REQUEST, 'booking_id is required');
        return;
    }

    if (!isValidInteger(req.params.booking_id)) {
        sendResponse(
            res,
            STATUS_CODE.BAD_REQUEST,
            'booking_id must be integer'
        );
        return;
    }

    if (!req.body.employee_id) {
        sendResponse(res, STATUS_CODE.BAD_REQUEST, 'employee_id is required');
        return;
    }

    if (!isValidInteger(req.body.employee_id)) {
        sendResponse(
            res,
            STATUS_CODE.BAD_REQUEST,
            'employee_id must be integer'
        );
        return;
    }

    try {
        const checkExistBooking = `SELECT * FROM ${TABLE_NAMES.bookings} WHERE id = ?`;
        const bookingsFound: Booking[] = (await selectData(checkExistBooking, [
            req.params.booking_id,
        ])) as Booking[];

        if (bookingsFound.length === 0) {
            sendResponse(res, STATUS_CODE.NOT_FOUND, 'booking not found!');
            return;
        }

        if (bookingsFound[0].status === BOOKING_STATE.pending) {
            sendResponse(
                res,
                STATUS_CODE.UNPROCESSABLE_ENTITY,
                'booking has not been confirmed yet!'
            );
            return;
        }

        const checkExistEmployee = `SELECT * FROM ${TABLE_NAMES.staffs} WHERE id = ?`;
        const employeesFound: Staff[] = (await selectData(checkExistEmployee, [
            req.body.employee_id,
        ])) as Staff[];

        if (employeesFound.length === 0) {
            sendResponse(res, STATUS_CODE.NOT_FOUND, 'employee not found!');
            return;
        }

        if (employeesFound[0].active == ACCOUNT_STATE.deactive) {
            sendResponse(
                res,
                STATUS_CODE.BAD_REQUEST,
                'employee is not active!'
            );
            return;
        }

        const updateBooking = `UPDATE ${TABLE_NAMES.bookings} SET staff_id = ?, note = ? WHERE id = ?`;
        const bodyData = [];

        bodyData.push(req.body.employee_id);
        bodyData.push(req.body.note);
        bodyData.push(req.params.booking_id);

        await excuteQuery(updateBooking, bodyData);

        sendResponse(
            res,
            STATUS_CODE.OK,
            'booking assigned to employee successfully!'
        );
    } catch (error) {
        sendResponse(
            res,
            STATUS_CODE.INTERNAL_SERVER_ERROR,
            'something went wrong' + error
        );
        return;
    }
};
