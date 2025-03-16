import { CustomRequest } from '@/src/types/requests';
import { Response } from 'express';

import {
    selectData,
    sendResponse,
    convertTimeToGMT7,
} from '@/src/ultil/ultil.lib';
import { STATUS_CODE } from '@/src/configs/status.codes.config';
import { TABLE_NAMES, USER_ROLES } from '@/src/configs/constants.config';
import { BookingResponse } from '@/src/types/responses';

export const getLatestBooking = async (req: CustomRequest, res: Response) => {
    try {
        const where = [];
        const params = [];
        if (req.tokenPayload.role !== USER_ROLES.admin) {
            where.push('user_id = ?');
            params.push([req.tokenPayload.user_id]);
        }

        where.push(`status != 'done' AND status != 'canceled' `);
        let whereCondition = where.length ? `WHERE ${where.join(' AND ')}` : '';

        whereCondition += ' ORDER BY created_at DESC LIMIT 10';

        /**FIND SERVICE */
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
            st_addr.address_name AS station_address_name
        FROM
            ${TABLE_NAMES.bookings} AS b
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
        ${whereCondition}
 `;

        const bookings: BookingResponse[] = (await selectData(
            selectQuery,
            params
        )) as BookingResponse[];

        const newList = bookings.map(
            ({
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
            }) => {
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

                return other;
            }
        );

        sendResponse(
            res,
            STATUS_CODE.OK,
            'Get all bookings by user id successfully!',
            newList
        );
    } catch (error) {
        sendResponse(
            res,
            STATUS_CODE.INTERNAL_SERVER_ERROR,
            'something went wrong' + error
        );
    }
};

export const getAllBooking = async (req: CustomRequest, res: Response) => {
    try {
        // Lấy `startDay` và `endDay` từ query params
        const {
            start_date: startDay,
            end_date: endDay,
            status,
            station,
            search,
            sort,
            limit,
        } = req.query;

        let cursor = req.query.cursor;

        if (!cursor) {
            cursor = '0';
        }

        let where = [];
        const params = [];
        if (req.tokenPayload.role !== USER_ROLES.admin) {
            where.push('user_id = ?');
            params.push([req.tokenPayload.user_id]);
        }

        // Nếu có cả `startDay` và `endDay`
        if (startDay && endDay) {
            const startDate = new Date(startDay as string);
            const endDate = new Date(endDay as string);

            // Trường hợp `startDay` và `endDay` là cùng một ngày
            if (startDate.toDateString() === endDate.toDateString()) {
                const dateCondition = `DATE(b.created_at) = ?`;

                where.push(dateCondition);

                params.push(startDay);
            }
            // Trường hợp `startDay` và `endDay` khác nhau
            else {
                const dateRangeCondition = `DATE(b.created_at) BETWEEN ? AND ?`;
                where.push(dateRangeCondition);

                params.push(startDay, endDay);
            }
        }

        if (status) {
            where.push('b.status = ?');
            params.push(status);
        }

        if (station) {
            where.push('st.id = ?');
            params.push(station);
        }

        if (search) {
            where.push(
                '(u.firstname LIKE ? OR u.lastname LIKE ? OR u.phone LIKE ? OR s.name LIKE ?)'
            );
            params.push(
                `%${search}%`,
                `%${search}%`,
                `%${search}%`,
                `%${search}%`
            );
        }

        /**FIND SERVICE */
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
            IF(p.id IS NULL, 0, 1) AS is_paid,
            inv.invoice_file
        FROM
            ${TABLE_NAMES.bookings} AS b
        INNER JOIN
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
            ${TABLE_NAMES.payments} AS p ON p.invoice_id = inv.id AND p.status = 'success'
        ${where.length > 0 ? `WHERE ${where.join(' AND ')}` : ''}

        ${sort ? `ORDER BY created_at ${sort}` : 'ORDER BY created_at DESC'}

        ${limit ? `LIMIT ${cursor}, ${limit}` : ''}
 `;

        const bookings: BookingResponse[] = (await selectData(
            selectQuery,
            params
        )) as BookingResponse[];

        const newList = bookings.map((bookingRes) => {
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
                is_paid,
                ...other
            } = bookingRes;

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

            if (typeof is_paid === 'number' && is_paid === 0) {
                other.is_paid = false;
            } else {
                other.is_paid = true;
            }

            return other;
        });

        sendResponse(
            res,
            STATUS_CODE.OK,
            'Get all bookings successfully!',
            newList
        );
    } catch (error) {
        sendResponse(
            res,
            STATUS_CODE.INTERNAL_SERVER_ERROR,
            'something went wrong' + error
        );
    }
};
