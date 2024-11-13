const {
    BOOKING_STATE,
    TABLE_NAMES,
    ACCOUNT_STATE,
} = require('../configs/constants.config');
const { STATUS_CODE } = require('../configs/status.codes.config');
const { createUserNotification } = require('../services/notificationService');
const { sendNotificationToTopic } = require('../ultil/firebaseServices');
const {
    isValidInteger,
    selectData,
    excuteQuery,
    sendResponse,
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
        const checkExistBooking = `
         SELECT 
            b.*,
            s.name AS service_name
        FROM ${TABLE_NAMES.bookings} AS b
        JOIN ${TABLE_NAMES.services} AS s ON b.service_id = s.id
        WHERE b.id = ?
        `;
        const bookingsFound = await selectData(checkExistBooking, [
            req.params.booking_id,
        ]);

        if (bookingsFound.length === 0) {
            sendResponse(res, STATUS_CODE.NOT_FOUND, 'booking not found!');
            return;
        }

        // if (bookingsFound[0].status === BOOKING_STATE.accepted) {
        //     sendResponse(
        //         res,
        //         STATUS_CODE.CONFLICT,
        //         'booking has been already confirmed!'
        //     );

        //     return;
        // }

        const updateBooking = `UPDATE ${TABLE_NAMES.bookings} SET status = ?,pre_status = ?, staff_id = ?, note = ? WHERE id = ?`;

        await excuteQuery(updateBooking, [
            BOOKING_STATE.accepted,
            BOOKING_STATE.accepted,
            req.body.employee_id,
            req.body.note,
            req.params.booking_id,
        ]);

        const title = 'Xác nhận lịch hẹn';
        const message = `Lịch hẹn ${bookingsFound[0].service_name} đã được xác nhận và sẽ được thực hiện đúng giờ. Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!`;
        const userId = bookingsFound[0].user_id;
        await createUserNotification(userId, title, message);
        sendNotificationToTopic(title, message, `customer_${userId}`);

        sendResponse(res, STATUS_CODE.OK, 'booking confirmed successfully!');
    } catch (error) {
        sendResponse(
            res,
            STATUS_CODE.INTERNAL_SERVER_ERROR,
            'something went wrong' + error
        );
    }
};

const assignBookingToEmployee = async (req, res) => {
    console.log(req.body);
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

const adminBookingController = {
    confirmBooking,
    assignBookingToEmployee,
};

module.exports = adminBookingController;
