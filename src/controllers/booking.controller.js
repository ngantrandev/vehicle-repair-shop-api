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
} = require('../ultil.lib');
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
        s.name AS service_name,
        s.price AS service_price,
        stf.id AS staff_id,
        stf.firstname AS staff_firstname,
        stf.lastname AS staff_lastname,
        u.firstname AS user_firstname,
        u.lastname AS user_lastname,
        u.phone AS user_phone,
        a.street,
        w.name AS ward_name,
        d.name AS district_name,
        p.name AS province_name,
        ss.id AS station_id


    FROM
        ${TABLE_NAMES.bookings} AS b
    LEFT JOIN
        ${TABLE_NAMES.services} AS s ON s.id = b.service_id
    LEFT JOIN
        ${TABLE_NAMES.staffs} AS stf ON stf.id = b.staff_id
    LEFT JOIN
        ${TABLE_NAMES.service_stations} AS ss ON ss.id = stf.station_id
    LEFT JOIN
        ${TABLE_NAMES.users} AS u ON u.id = b.user_id
    LEFT JOIN
        ${TABLE_NAMES.addresses} AS a ON a.id = b.address_id
    LEFT JOIN
        ${TABLE_NAMES.wards} AS w ON w.id = a.ward_id
    LEFT JOIN
        ${TABLE_NAMES.districts} AS d ON d.id = w.district_id
    LEFT JOIN
        ${TABLE_NAMES.provinces} AS p ON p.id = d.province_id
    WHERE user_id = ? AND b.id = ?
`;
        const bookings = await selectData(selectQuery, [
            req.params.user_id,
            req.params.booking_id,
        ]);

        if (bookings.length === 0) {
            sendResponse(res, STATUS_CODE.NOT_FOUND, 'booking not found!');
            return;
        }

        const {
            service_id,
            service_name,
            service_price,
            user_id,
            staff_id,
            staff_firstname,
            staff_lastname,
            user_firstname,
            user_lastname,
            user_phone,
            street,
            ward_name,
            district_name,
            province_name,
            ...other
        } = bookings[0];
        other.created_at = convertTimeToGMT7(other.created_at);
        if (other.modified_at) {
            other.modified_at = convertTimeToGMT7(other.modified_at);
        }
        other.staff = {
            id: staff_id,
            firstname: staff_firstname,
            lastname: staff_lastname,
        };
        other.service = {
            id: service_id,
            name: service_name,
            price: service_price,
        };

        other.user = {
            id: user_id,
            firstname: user_firstname,
            lastname: user_lastname,
            phone: user_phone,
        };

        other.address = {
            street: street,
            ward: ward_name,
            district: district_name,
            province: province_name,
        };

        sendResponse(
            res,
            STATUS_CODE.OK,
            'Get booking by booking_id and user_id successfully!',
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

    try {
        /** auto choose staffid if user give latitude and longitude */
        const stationId = await getIdOfNearestStation(
            req.body.latitude,
            req.body.longitude
        );

        const staffId = await getIdOfTheMostFreeStaff(stationId);

        const queries = [
            `INSERT INTO ${TABLE_NAMES.addresses} (latitude, longitude, ward_id, street) VALUES (?, ?, ?, ?);`,
            'SET @address_id = LAST_INSERT_ID();',
            `INSERT INTO ${TABLE_NAMES.bookings} (service_id, note, user_id, created_at, modified_at, address_id, status, staff_id) VALUES (?, ?, ?, ?, ?, @address_id, ?, ?);`,
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
            ],
        ];

        await executeTransaction(queries, params);

        sendResponse(res, STATUS_CODE.OK, 'Created booking successfully!');
    } catch (error) {
        sendResponse(
            res,
            STATUS_CODE.INTERNAL_SERVER_ERROR,
            'something went wrongs!'
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

        const updateBooking = `UPDATE ${TABLE_NAMES.bookings} SET status = ? WHERE id = ?`;
        await excuteQuery(updateBooking, [
            BOOKING_STATE.done,
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
