const path = require('path');
const sharp = require('sharp');

const {
    selectData,
    isValidInteger,
    sendResponse,
    convertTimeToGMT7,
    excuteQuery,
    getCurrentTimeInGMT7,
    isValidDouble,
    executeTransaction,
    getIdOfTheMostFreeStaff,
    getIdOfNearestStation,
} = require('../ultil/ultil.lib');
const { STATUS_CODE } = require('../configs/status.codes.config');
const { TABLE_NAMES, BOOKING_STATE } = require('../configs/constants.config');

const getBookingById = async (req, res) => {
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
                s.id AS service_id,
                s.name AS service_name,
                s.price AS service_price,
                addr.street AS address_street,
                addr.latitude AS address_latitude,
                addr.longitude AS address_longitude,
                w.name AS ward_name,
                d.name AS district_name,
                p.name AS province_name,
                u.id AS user_id,
                u.firstname AS user_firstname,
                u.lastname AS user_lastname,
                u.email AS user_email,
                u.phone AS user_phone,
                ss.id AS station_id,
                ss.name AS station_name,
                ss_addr.longitude AS station_longitude,
                ss_addr.latitude AS station_latitude,
                stf.id AS staff_id


            FROM ( SELECT *
                    FROM ${TABLE_NAMES.bookings}
                    WHERE id = ?) AS b
            JOIN ${TABLE_NAMES.users} AS u ON b.user_id = u.id
            JOIN ${TABLE_NAMES.services} AS s ON b.service_id = s.id
            JOIN ${TABLE_NAMES.addresses} AS addr ON addr.id = b.address_id
            JOIN ${TABLE_NAMES.wards} AS w ON w.id = addr.ward_id
            JOIN ${TABLE_NAMES.districts} AS d ON d.id = w.district_id
            JOIN ${TABLE_NAMES.provinces} AS p ON p.id = d.province_id
            LEFT JOIN ${TABLE_NAMES.staffs} AS stf ON stf.id = b.staff_id
            LEFT JOIN ${TABLE_NAMES.service_stations} AS ss ON ss.id = stf.station_id
            LEFT JOIN ${TABLE_NAMES.addresses} AS ss_addr ON ss_addr.id = ss.address_id

       
`;
        const bookings = await selectData(selectQuery, [req.params.booking_id]);

        if (bookings.length === 0) {
            sendResponse(res, STATUS_CODE.NOT_FOUND, 'booking not found!');
            return;
        }

        const {
            service_name,
            service_id,
            service_price,
            address_id,
            address_street,
            address_latitude,
            address_longitude,
            ward_name,
            district_name,
            province_name,
            user_id,
            user_firstname,
            user_lastname,
            user_email,
            user_phone,
            station_id,
            station_name,
            station_longitude,
            station_latitude,
            ...other
        } = bookings[0];
        other.created_at = convertTimeToGMT7(other.created_at);
        other.modified_at = convertTimeToGMT7(other.modified_at);

        other.service = {
            id: service_id,
            name: service_name,
            price: service_price,
        };

        other.address = {
            id: address_id,
            street: address_street,
            latitude: address_latitude,
            longitude: address_longitude,
            ward: ward_name,
            district: district_name,
            province: province_name,
        };

        other.user = {
            id: user_id,
            firstname: user_firstname,
            lastname: user_lastname,
            email: user_email,
            phone: user_phone,
        };

        other.station = {
            id: station_id,
            name: station_name,
            latitude: station_latitude,
            longitude: station_longitude,
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
            'something went wrongs!'
        );
    }
};
const createBooking = async (req, res) => {
    /**VALIDATE VALUE */
    if (!req.body.ward_id) {
        sendResponse(res, STATUS_CODE.BAD_REQUEST, `ward_id is required`);
        return;
    }
    if (!req.body.street) {
        sendResponse(res, STATUS_CODE.BAD_REQUEST, `street is required`);
        return;
    }
    if (!req.body.service_id) {
        sendResponse(res, STATUS_CODE.BAD_REQUEST, `service_id is required`);
        return;
    }

    /** VALIDATE VALUE TYPE */
    if (!isValidInteger(req.body.service_id)) {
        sendResponse(
            res,
            STATUS_CODE.BAD_REQUEST,
            `service_id must be integer`
        );
        return;
    }

    if (req.body.latitude && !isValidDouble(req.body.latitude)) {
        sendResponse(res, STATUS_CODE.BAD_REQUEST, `latitude must be double`);
        return;
    }
    if (req.body.longitude && !isValidDouble(req.body.longitude)) {
        sendResponse(res, STATUS_CODE.BAD_REQUEST, `longitude must be double`);
        return;
    }

    let fileName = '';
    let relativePath = ''; /** path from root dir to image */

    try {
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
                    'cannot create booking at this time'
                );
                return;
            }
        }

        /** auto choose staffid if user give latitude and longitude */
        const stationId = await getIdOfNearestStation(
            req.body.latitude,
            req.body.longitude
        );

        const staffId = await getIdOfTheMostFreeStaff(stationId);

        const queries = [
            `INSERT INTO ${TABLE_NAMES.addresses} (latitude, longitude, ward_id, street) VALUES (?, ?, ?, ?);`,
            'SET @address_id = LAST_INSERT_ID();',
            `INSERT INTO ${TABLE_NAMES.bookings} (service_id, note, user_id, created_at, modified_at, address_id, status, staff_id, image_url) VALUES (?, ?, ?, ?, ?, @address_id, ?, ?, ?);`,
        ];
        const createdTime = getCurrentTimeInGMT7();

        const params = [
            [
                req.body.latitude,
                req.body.longitude,
                req.body.ward_id,
                req.body.street,
            ],
            [],
            [
                req.body.service_id,
                req.body.note,
                req.params.user_id,
                createdTime,
                createdTime,
                BOOKING_STATE.pending,
                staffId ? staffId.toString() : null,
                relativePath,
            ],
        ];

        await executeTransaction(queries, params);

        sendResponse(res, STATUS_CODE.OK, 'Created booking successfully!');
    } catch (error) {
        sendResponse(
            res,
            STATUS_CODE.INTERNAL_SERVER_ERROR,
            'something went wrongs!' + error
        );
    }
};

const cancelBooking = async (req, res) => {
    if (!req.params.booking_id) {
        sendResponse(res, STATUS_CODE.BAD_REQUEST, 'id is required');
        return;
    }

    if (!req.body.note) {
        sendResponse(res, STATUS_CODE.BAD_REQUEST, 'field note is required');
        return;
    }

    if (!isValidInteger(req.params.booking_id)) {
        sendResponse(res, STATUS_CODE.BAD_REQUEST, 'id must be interger');
        return;
    }

    if (req.body.note.trim().length === 0) {
        sendResponse(res, STATUS_CODE.BAD_REQUEST, 'note cannot empty');
        return;
    }

    try {
        const selectQuery = `SELECT * FROM ${TABLE_NAMES.bookings} WHERE id = ?`;
        const bookings = await selectData(selectQuery, [req.params.booking_id]);
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
        SET modified_at = ?, status = ?, note = ?
        WHERE
            id = ? AND status != ?`;
        const result = await excuteQuery(query, [
            getCurrentTimeInGMT7(),
            BOOKING_STATE.cancelled,
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
        } else if (result.affectedRows === 0) {
            sendResponse(
                res,
                STATUS_CODE.CONFLICT,
                'this booking has been already cancelled'
            );
            return;
        }

        sendResponse(res, STATUS_CODE.OK, 'canceled booking successfully!');
        return;
    } catch (error) {
        sendResponse(
            res,
            STATUS_CODE.INTERNAL_SERVER_ERROR,
            'something went wrong'
        );
    }
};

const setBookingStatusToDone = async (req, res) => {
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
        const checkExistBooking = `SELECT * FROM ${TABLE_NAMES.bookings} WHERE id = ?`;
        const bookingsFound = await selectData(checkExistBooking, [
            req.params.booking_id,
        ]);

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

        if (bookingsFound[0].status === BOOKING_STATE.done) {
            sendResponse(
                res,
                STATUS_CODE.CONFLICT,
                'booking has been already set to done status!'
            );
            return;
        }

        const updateBooking = `UPDATE ${TABLE_NAMES.bookings} SET status = ?, note = ? WHERE id = ?`;
        await excuteQuery(updateBooking, [
            BOOKING_STATE.done,
            req.body.note,
            req.params.booking_id,
        ]);

        sendResponse(
            res,
            STATUS_CODE.OK,
            'booking status changed to done successfully!'
        );
    } catch (error) {
        sendResponse(
            res,
            STATUS_CODE.INTERNAL_SERVER_ERROR,
            'something went wrongs!'
        );
    }
};

const bookingController = {
    getBookingById,
    createBooking,
    cancelBooking,
    setBookingStatusToDone,
};

module.exports = bookingController;
