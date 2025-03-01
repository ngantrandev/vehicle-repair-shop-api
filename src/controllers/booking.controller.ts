import path from 'path';
import sharp from 'sharp';

import { CustomRequest } from '@/src/types/requests';
import { Response } from 'express';
import { BookingResponse } from '@/src/types/responses';
import { Invoice, Item } from '@/src/types/models';

import {
    selectData,
    isValidInteger,
    sendResponse,
    convertTimeToGMT7,
    excuteQuery,
    getCurrentTimeInGMT7,
    isValidDouble,
    executeTransaction,
    convertDateToGMT7,
} from '@/src/ultil/ultil.lib';
import { STATUS_CODE } from '@/src/configs/status.codes.config';
import {
    TABLE_NAMES,
    BOOKING_STATE,
    USER_ROLES,
    PAYMENT_STATUS,
} from '@/src/configs/constants.config';
import { createUserNotification } from '@/src/services/notification.service';
import { sendNotificationToTopic } from '@/src/services/firebase.service';
import { createInvoiceFile } from '@/src/services/invoice.service';

export const getBookingById = async (req: CustomRequest, res: Response) => {
    if (!req.params.booking_id) {
        sendResponse(res, STATUS_CODE.BAD_REQUEST, 'booking_id is required');
        return;
    }

    if (!isValidInteger(req.params.booking_id)) {
        sendResponse(
            res,
            STATUS_CODE.BAD_REQUEST,
            'booking_id must be interger'
        );
        return;
    }

    try {
        /**FIND BOOKING */
        const selectQuery = `
   
            SELECT
                b.*,
                s.name AS service_name,
                s.price AS service_price,
                s.image_url AS service_image_url,
                s.estimated_time AS service_estimated_time,
                stf.id AS staff_id,
                stf.firstname AS staff_firstname,
                stf.lastname AS staff_lastname,
                addr.address_name,
                addr.full_address,
                addr.latitude as address_latitude,
                addr.longitude as address_longitude,
                u.id AS user_id,
                u.firstname AS user_firstname,
                u.lastname AS user_lastname,
                u.phone AS user_phone,
                st.id AS station_id,
                st.name AS station_name,
                st_addr.latitude AS station_latitude,
                st_addr.longitude AS station_longitude,
                st_addr.full_address AS station_address,
                st_addr.address_name AS station_address_name,
                IFNULL(SUM(p.amount_paid), 0) AS paid_amount,
                IFNULL(inv.invoice_file, '') AS invoice_file
            FROM ( SELECT *
                    FROM ${TABLE_NAMES.bookings}
                    WHERE id = ?) AS b
            LEFT JOIN
                ${TABLE_NAMES.services} AS s ON s.id = b.service_id
            LEFT JOIN
                ${TABLE_NAMES.staffs} AS stf ON stf.id = b.staff_id
            LEFT JOIN
                ${TABLE_NAMES.addresses} AS addr ON addr.id = b.address_id
            LEFT JOIN
                ${TABLE_NAMES.users} AS u ON u.id = b.user_id
            LEFT JOIN
                ${TABLE_NAMES.service_stations} AS st ON st.id = stf.station_id
            LEFT JOIN
                ${TABLE_NAMES.addresses} AS st_addr ON st_addr.id = st.address_id
            LEFT JOIN
                ${TABLE_NAMES.invoices} AS inv ON inv.booking_id = b.id
            LEFT JOIN
                ${TABLE_NAMES.payments} AS p ON p.invoice_id = inv.id AND p.status = '${PAYMENT_STATUS.success}'
        `;

        const bookings: BookingResponse[] = (await selectData(selectQuery, [
            req.params.booking_id,
            req.tokenPayload.user_id,
        ])) as BookingResponse[];

        if (bookings.length === 0) {
            sendResponse(res, STATUS_CODE.NOT_FOUND, 'booking not found!');
            return;
        }

        const {
            service_name,
            service_id,
            service_price,
            service_image_url,
            service_estimated_time,
            address_id,
            address_latitude,
            address_longitude,
            address_name,
            full_address,
            user_id,
            user_firstname,
            user_lastname,
            user_email,
            user_phone,
            station_id,
            station_name,
            station_longitude,
            station_latitude,
            station_address,
            station_address_name,
            staff_id,
            staff_firstname,
            staff_lastname,
            ...other
        } = bookings[0];
        other.created_at = convertTimeToGMT7(other.created_at);
        if (other.modified_at) {
            other.modified_at = convertTimeToGMT7(other.modified_at);
        }
        other.service = {
            id: service_id,
            name: service_name,
            price: service_price,
            image_url: service_image_url,
            estimated_time: service_estimated_time,
        };

        other.address = {
            id: address_id,
            latitude: address_latitude,
            longitude: address_longitude,
            address_name: address_name,
            full_address: full_address,
        };

        other.user = {
            id: user_id,
            firstname: user_firstname,
            lastname: user_lastname,
            email: user_email,
            phone: user_phone,
        };

        other.staff = {
            id: staff_id,
            firstname: staff_firstname,
            lastname: staff_lastname,
            station: {
                id: station_id,
                name: station_name,
                address: {
                    latitude: station_latitude,
                    longitude: station_longitude,
                    address_name: station_address_name,
                    full_address: station_address,
                },
            },
        };

        sendResponse(
            res,
            STATUS_CODE.OK,
            'Get booking by booking_id successfully!',
            other
        );
    } catch (error) {
        sendResponse(
            res,
            STATUS_CODE.INTERNAL_SERVER_ERROR,
            'something went wrongs!' + error
        );
    }
};

export const createBooking = async (req: CustomRequest, res: Response) => {
    try {
        if (!req?.body?.data) {
            sendResponse(res, STATUS_CODE.BAD_REQUEST, `data is required`);
            return;
        }

        const bodyData = JSON.parse(req?.body?.data);

        const {
            items,
            service_id,
            latitude,
            longitude,
            address_name,
            full_address,
            place_id,
            note,
        }: {
            items: number[];
            service_id: string;
            latitude: string;
            longitude: string;
            address_name: string;
            full_address: string;
            place_id: string;
            note: string;
        } = bodyData;

        /**VALIDATE VALUE */
        if (!service_id) {
            sendResponse(
                res,
                STATUS_CODE.BAD_REQUEST,
                `service_id is required`
            );
            return;
        }

        /** VALIDATE VALUE TYPE */
        if (!isValidInteger(service_id)) {
            sendResponse(
                res,
                STATUS_CODE.BAD_REQUEST,
                `service_id must be integer`
            );
            return;
        }

        if (latitude && !isValidDouble(latitude)) {
            sendResponse(
                res,
                STATUS_CODE.BAD_REQUEST,
                `latitude must be double`
            );
            return;
        }
        if (longitude && !isValidDouble(longitude)) {
            sendResponse(
                res,
                STATUS_CODE.BAD_REQUEST,
                `longitude must be double`
            );
            return;
        }
        if (!address_name) {
            sendResponse(
                res,
                STATUS_CODE.BAD_REQUEST,
                `address_name is required`
            );
            return;
        }
        if (!full_address) {
            sendResponse(
                res,
                STATUS_CODE.BAD_REQUEST,
                `full_address is required`
            );
            return;
        }
        if (!place_id) {
            sendResponse(res, STATUS_CODE.BAD_REQUEST, `place_id is required`);
            return;
        }

        let fileName = '';
        let relativePath = ''; /** path from root dir to image */

        if (req.file) {
            const buffer = req.file.buffer;
            fileName = Date.now() + '.webp';
            relativePath = path.join('./uploads', fileName);

            try {
                await sharp(buffer).webp({ quality: 20 }).toFile(relativePath);
            } catch (error) {
                sendResponse(
                    res,
                    STATUS_CODE.INTERNAL_SERVER_ERROR,
                    'cannot create booking at this time' + error
                );
                return;
            }
        }

        const queries = [
            `INSERT INTO ${TABLE_NAMES.addresses} (latitude, longitude, place_id, address_name, full_address) VALUES (?, ?, ?, ?, ?);`,
            'SET @address_id = LAST_INSERT_ID();',
            `INSERT INTO ${TABLE_NAMES.bookings} (service_id, note, user_id, created_at, modified_at, address_id, status, image_url) VALUES (?, ?, ?, ?, ?, @address_id, ?, ?);`,
        ];
        const createdTime = getCurrentTimeInGMT7();

        const params = [
            [latitude, longitude, place_id, address_name, full_address],
            [],
            [
                service_id,
                note,
                req.tokenPayload.user_id,
                createdTime,
                createdTime,
                BOOKING_STATE.pending,
                relativePath,
            ],
        ];

        if (items && items.length > 0) {
            const args: Number[] = [];
            const query = `
                INSERT INTO ${TABLE_NAMES.bookings_items} (item_id, booking_id, count, price)
                SELECT 
                    i.id,
                    @booking_id,
                    1,
                    ri.output_price
                FROM ${TABLE_NAMES.items} i
                INNER JOIN (
                    SELECT 
                        ii.item_id,
                        ii.output_price,
                        ROW_NUMBER() OVER (PARTITION BY ii.item_id ORDER BY i.date_input DESC) AS rn
                    FROM ${TABLE_NAMES.input_info} ii
                    INNER JOIN ${TABLE_NAMES.inputs} i ON ii.input_id = i.id
                ) ri ON i.id = ri.item_id
                WHERE ri.rn = 1
                AND i.id IN (${items.map((item) => {
                    return `${item}`;
                })})
                ON DUPLICATE KEY UPDATE
                    count = bookings_items.count + 1;

            `;

            queries.push('SET @booking_id = LAST_INSERT_ID();');
            params.push([]);

            queries.push(query);
            params.push(args);
        }

        const transactionRes: any[] = (await executeTransaction(
            queries,
            params
        )) as any[];

        const bookingId = transactionRes[2].insertId;

        const bookingsData: BookingResponse[] = (await selectData(
            `
            SELECT
                b.id booking_id,
                s.name service_name
            FROM bookings b
            INNER JOIN services s ON s.id = b.service_id
            LEFT JOIN bookings_items bi ON bi.booking_id = b.id 
            LEFT JOIN items i ON i.id = bi.item_id
            WHERE b.id = ?
            GROUP BY s.id, b.id
            
            `,
            [bookingId]
        )) as BookingResponse[];

        const { service_name } = bookingsData[0];

        const title = 'Tạo lịch hẹn thành công';
        const message = `Lịch hẹn "${service_name}" đã được tạo thành công!`;
        await createUserNotification(req.tokenPayload.user_id, title, message);

        sendResponse(res, STATUS_CODE.OK, 'Created booking successfully!', {
            id: bookingId,
        });
    } catch (error) {
        console.log(error);
        sendResponse(
            res,
            STATUS_CODE.INTERNAL_SERVER_ERROR,
            'something went wrongs!' + error
        );
    }
};

export const cancelBooking = async (req: CustomRequest, res: Response) => {
    if (!req.params.booking_id) {
        sendResponse(res, STATUS_CODE.BAD_REQUEST, 'id is required');
        return;
    }

    // if (!req.body.note) {
    //     sendResponse(res, STATUS_CODE.BAD_REQUEST, 'field note is required');
    //     return;
    // }

    if (!isValidInteger(req.params.booking_id)) {
        sendResponse(res, STATUS_CODE.BAD_REQUEST, 'id must be interger');
        return;
    }

    // if (!req.body.note || req.body.note.trim().length === 0) {
    //     sendResponse(res, STATUS_CODE.BAD_REQUEST, 'note cannot empty');
    //     return;
    // }

    try {
        const selectQuery = `SELECT * FROM ${TABLE_NAMES.bookings} WHERE id = ?`;
        const bookings: BookingResponse[] = (await selectData(selectQuery, [
            req.params.booking_id,
        ])) as BookingResponse[];
        if (bookings.length === 0) {
            sendResponse(
                res,
                STATUS_CODE.NOT_FOUND,
                'cannot find this booking by id'
            );
            return;
        }

        const query = `
        UPDATE ${TABLE_NAMES.bookings}
        SET modified_at = ?, status = ?, pre_status = ?, note = ?
        WHERE
            id = ? AND status != ?`;
        const result = await excuteQuery(query, [
            getCurrentTimeInGMT7(),
            BOOKING_STATE.cancelled,
            bookings[0].status,
            req.body.note,
            req.params.booking_id,
            BOOKING_STATE.cancelled,
        ]);

        if (!result) {
            sendResponse(
                res,
                STATUS_CODE.INTERNAL_SERVER_ERROR,
                'cannot cancel booking at this time'
            );
            return;
        }
        //  else if (result.affectedRows === 0) {
        //     sendResponse(
        //         res,
        //         STATUS_CODE.CONFLICT,
        //         'this booking has been already cancelled'
        //     );
        //     return;
        // }

        sendResponse(res, STATUS_CODE.OK, 'canceled booking successfully!');
        return;
    } catch (error) {
        sendResponse(
            res,
            STATUS_CODE.INTERNAL_SERVER_ERROR,
            'something went wrong' + error
        );
    }
};

export const undoBooking = async (req: CustomRequest, res: Response) => {
    if (!req.params.booking_id) {
        sendResponse(res, STATUS_CODE.BAD_REQUEST, 'id is required');
        return;
    }

    if (!isValidInteger(req.params.booking_id)) {
        sendResponse(res, STATUS_CODE.BAD_REQUEST, 'id must be interger');
        return;
    }

    try {
        let where = '';
        const args = [];

        if (req.tokenPayload.role === USER_ROLES.customer) {
            where = `WHERE id = ? AND user_id = ?`;
            args.push(req.params.booking_id);
            args.push(req.tokenPayload.user_id);
        } else if (req.tokenPayload.role === USER_ROLES.admin) {
            where = `WHERE id = ?`;
            args.push(req.params.booking_id);
        }

        const selectQuery = `SELECT * FROM ${TABLE_NAMES.bookings} ${where}`;

        const bookings: BookingResponse[] = (await selectData(
            selectQuery,
            args
        )) as BookingResponse[];

        if (bookings.length === 0) {
            sendResponse(
                res,
                STATUS_CODE.NOT_FOUND,
                'cannot find this booking by id'
            );
            return;
        }

        const query = `
        UPDATE ${TABLE_NAMES.bookings}
        SET status = ?
        WHERE
            id = ?`;
        const result = await excuteQuery(query, [
            bookings[0].pre_status,
            req.params.booking_id,
        ]);

        if (!result) {
            sendResponse(
                res,
                STATUS_CODE.INTERNAL_SERVER_ERROR,
                'cannot undo booking at this time'
            );
            return;
        }

        sendResponse(res, STATUS_CODE.OK, 'undo booking successfully!');
        return;
    } catch (error) {
        sendResponse(
            res,
            STATUS_CODE.INTERNAL_SERVER_ERROR,
            'something went wrong' + error
        );
    }
};

export const setBookingStatusToDone = async (
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

    try {
        const checkExistBooking = `
        SELECT 
            b.*,
            s.name AS service_name,
            s.price AS service_price,
            u.lastname AS user_lastname,
            u.firstname AS user_firstname,
            u.phone AS user_phone,
            addr.full_address,
            addr.address_name
        FROM ${TABLE_NAMES.bookings} AS b
        JOIN ${TABLE_NAMES.services} AS s ON b.service_id = s.id
        JOIN ${TABLE_NAMES.users} AS u ON b.user_id = u.id
        JOIN ${TABLE_NAMES.addresses} AS addr ON b.address_id = addr.id
        WHERE b.id = ?
        `;
        const bookingsFound: BookingResponse[] = (await selectData(
            checkExistBooking,
            [req.params.booking_id]
        )) as BookingResponse[];

        if (bookingsFound.length === 0) {
            sendResponse(
                res,
                STATUS_CODE.NOT_FOUND,
                'cannot found this booking!'
            );
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

        if (bookingsFound[0].status === BOOKING_STATE.cancelled) {
            sendResponse(
                res,
                STATUS_CODE.UNPROCESSABLE_ENTITY,
                'booking has been already cancelled!'
            );
            return;
        }

        // if (bookingsFound[0].status === BOOKING_STATE.done) {
        //     sendResponse(
        //         res,
        //         STATUS_CODE.CONFLICT,
        //         'booking has been already set to done status!'
        //     );
        //     return;
        // }

        const updateBooking = `UPDATE ${TABLE_NAMES.bookings} SET status = ?, pre_status = ?, note = ? WHERE id = ?`;
        await excuteQuery(updateBooking, [
            BOOKING_STATE.done,
            bookingsFound[0].status,
            req.body.note,
            req.params.booking_id,
        ]);

        const {
            user_phone,
            user_firstname,
            user_lastname,
            address_name,
            full_address,
            service_name,
            service_price,
        } = bookingsFound[0];

        const items: Item[] = (await selectData(
            `
            SELECT
                i.id AS id,
                i.name AS name,
                bi.price AS price,
                bi.count AS quantity
            FROM ${TABLE_NAMES.bookings_items} AS bi
            JOIN ${TABLE_NAMES.items} AS i ON bi.item_id = i.id
            WHERE bi.booking_id = ?
            GROUP BY i.id, i.name, bi.price  
        `,
            [req.params.booking_id]
        )) as Item[];

        const invoice: Invoice = {
            booking_id: req.params.booking_id,
            full_address: address_name + ', ' + full_address,
            items: items || [],
            service: {
                name: service_name,
                price: service_price,
            },
            user: {
                fullname: user_lastname + ' ' + user_firstname,
                phone: user_phone,
            },
        };

        const invoicePath = `invoice_${req.params.booking_id}_${convertDateToGMT7(new Date())}.pdf`;

        await createInvoiceFile(invoice, invoicePath);

        await excuteQuery(
            `UPDATE ${TABLE_NAMES.invoices} SET invoice_file = ? WHERE booking_id = ?`,
            [invoicePath, req.params.booking_id]
        );

        const title = 'Quá trình sửa chữa hoàn tất!';
        const message = `Nhân viên đã hoàn tất dịch vụ ${bookingsFound[0]?.service_name}`;
        const userId = bookingsFound[0].user_id;
        await createUserNotification(userId, title, message);
        await sendNotificationToTopic(title, message, `customer_${userId}`);

        sendResponse(
            res,
            STATUS_CODE.OK,
            'booking status changed to done successfully!'
        );
    } catch (error) {
        sendResponse(
            res,
            STATUS_CODE.INTERNAL_SERVER_ERROR,
            'something went wrongs!' + error
        );
    }
};
