const {
    BOOKING_STATE,
    TABLE_NAMES,
    ACCOUNT_STATE,
} = require('../configs/constants.config');
const { STATUS_CODE } = require('../configs/status.codes.config');
const {
    isValidInteger,
    selectData,
    excuteQuery,
    sendResponse,
    convertTimeToGMT7,
} = require('../ultil/ultil.lib');

const confirmBooking = async (req, res) => {
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
        sendResponse(res, STATUS_CODE.BAD_REQUEST, 'staff_id is required');
        return;
    }

    if (!isValidInteger(req.body.employee_id)) {
        sendResponse(res, STATUS_CODE.BAD_REQUEST, 'staff_id must be integer');
        return;
    }

    try {
        const checkExistBooking = `SELECT * FROM ${TABLE_NAMES.bookings} WHERE id = ?`;
        const bookingsFound = await selectData(checkExistBooking, [
            req.params.booking_id,
        ]);

        if (bookingsFound.length === 0) {
            sendResponse(res, STATUS_CODE.NOT_FOUND, 'booking not found!');
            return;
        }

        if (bookingsFound[0].status === BOOKING_STATE.accepted) {
            sendResponse(
                res,
                STATUS_CODE.CONFLICT,
                'booking has been already confirmed!'
            );

            return;
        }

        const updateBooking = `UPDATE ${TABLE_NAMES.bookings} SET status = ?,pre_status = ?, staff_id = ?, note = ? WHERE id = ?`;

        await excuteQuery(updateBooking, [
            BOOKING_STATE.accepted,
            BOOKING_STATE.accepted,
            req.body.employee_id,
            req.body.note,
            req.params.booking_id,
        ]);

        sendResponse(res, STATUS_CODE.OK, 'booking confirmed successfully!');
    } catch (error) {
        sendResponse(
            res,
            STATUS_CODE.INTERNAL_SERVER_ERROR,
            'something went wrong'
        );
    }
};

const assignBookingToEmployee = async (req, res) => {
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
        const bookingsFound = await selectData(checkExistBooking, [
            req.params.booking_id,
        ]);

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
        const employeesFound = await selectData(checkExistEmployee, [
            req.body.employee_id,
        ]);

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

        let updateBooking = '';
        const bodyData = [];
        bodyData.push(req.body.employee_id);

        if (req.body.note) {
            updateBooking = `UPDATE ${TABLE_NAMES.bookings} SET staff_id = ?, note = ? WHERE id = ?`;
            bodyData.push(req.body.note);
        } else {
            updateBooking = `UPDATE ${TABLE_NAMES.bookings} SET staff_id = ? WHERE id = ?`;
        }

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
            'something went wrong'
        );
        return;
    }
};

const getAllBooking = async (req, res) => {
    const query = `
    
        SELECT
                b.*,
                s.name AS service_name,
                s.price AS service_price,
                stf.id AS staff_id,
                stf.firstname AS staff_firstname,
                stf.lastname AS staff_lastname,
                u.firstname AS user_firstname,
                u.lastname AS user_lastname,
                u.email AS user_email,
                u.phone AS user_phone
            FROM
                ${TABLE_NAMES.bookings} AS b
            LEFT JOIN
                ${TABLE_NAMES.services} AS s ON s.id = b.service_id
            LEFT JOIN
                ${TABLE_NAMES.staffs} AS stf ON stf.id = b.staff_id
            LEFT JOIN
                ${TABLE_NAMES.users} AS u ON u.id = b.user_id
    `;

    const bookings = await selectData(query, []);

    const newList = bookings.map(
        ({
            service_id,
            service_name,
            service_price,
            user_id,
            user_firstname,
            user_lastname,
            user_email,
            user_phone,
            staff_id,
            staff_firstname,
            staff_lastname,
            ...other
        }) => {
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
                email: user_email,
                phone: user_phone,
            };

            return other;
        }
    );

    sendResponse(
        res,
        STATUS_CODE.OK,
        'Get all bookings successfully!',
        newList
    );
};

const adminBookingController = {
    confirmBooking,
    assignBookingToEmployee,
    getAllBooking,
};

module.exports = adminBookingController;
