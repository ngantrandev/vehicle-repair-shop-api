const { BOOKING_STATE, TABLE_NAMES } = require('../configs/constants.config');
const { STATUS_CODE } = require('../configs/status.codes.config');
const {
    isValidInteger,
    selectData,
    excuteQuery,
    sendResponse,
    convertTimeToGMT7,
} = require('../ultil.lib');

const setBookingStatusToFixing = async (req, res) => {
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
        const checkExistBooking = `SELECT * FROM ${TABLE_NAMES.bookings} WHERE id = ? AND staff_id = ?`;
        const bookingsFound = await selectData(checkExistBooking, [
            req.params.booking_id,
            req.params.staff_id,
        ]);

        if (bookingsFound.length === 0) {
            sendResponse(
                res,
                STATUS_CODE.NOT_FOUND,
                'this booking does not belong to this staff!'
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
                STATUS_CODE.CONFLICT,
                'booking has been already cancelled!'
            );
            return;
        }

        if (bookingsFound[0].status === BOOKING_STATE.done) {
            sendResponse(
                res,
                STATUS_CODE.FORBIDDEN,
                'cannot change status of a booking that has been done!'
            );
            return;
        }

        if (bookingsFound[0].status === BOOKING_STATE.fixing) {
            sendResponse(
                res,
                STATUS_CODE.CONFLICT,
                'booking has been already set to fixing status!'
            );
            return;
        }

        const updateBooking = `UPDATE ${TABLE_NAMES.bookings} SET status = ? WHERE id = ?`;
        await excuteQuery(updateBooking, [
            BOOKING_STATE.fixing,
            req.params.booking_id,
        ]);

        sendResponse(
            res,
            STATUS_CODE.OK,
            'booking status changed to fixing successfully!'
        );
    } catch (error) {
        sendResponse(
            res,
            STATUS_CODE.INTERNAL_SERVER_ERROR,
            'something went wrongs!'
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
        const checkExistBooking = `SELECT * FROM ${TABLE_NAMES.bookings} WHERE id = ? AND staff_id = ?`;
        const bookingsFound = await selectData(checkExistBooking, [
            req.params.booking_id,
            req.params.staff_id,
        ]);

        if (bookingsFound.length === 0) {
            sendResponse(
                res,
                STATUS_CODE.NOT_FOUND,
                'this booking does not belong to this staff!'
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
                STATUS_CODE.CONFLICT,
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

const getAllBookingAssignedToStaff = async (req, res) => {
    try {
        const query = `
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
            p.name AS province_name
        
        FROM ${TABLE_NAMES.bookings} AS b
        JOIN 
            ${TABLE_NAMES.services} AS s ON b.service_id = s.id
        JOIN
            ${TABLE_NAMES.addresses} AS addr ON addr.id = b.address_id
        JOIN
            ${TABLE_NAMES.wards} AS w ON w.id = addr.ward_id
        JOIN
            ${TABLE_NAMES.districts} AS d ON d.id = w.district_id
        JOIN
            ${TABLE_NAMES.provinces} AS p ON p.id = d.province_id
        
        WHERE staff_id = ?
    `;

        const bookings = await selectData(query, [req.params.staff_id]);

        const newBookings = bookings.map(
            ({
                staff_id,
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
                ...other
            }) => {
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

                return other;
            }
        );

        sendResponse(res, STATUS_CODE.OK, 'success', newBookings);
    } catch (error) {
        sendResponse(
            res,
            STATUS_CODE.INTERNAL_SERVER_ERROR,
            'something went wrongs!'
        );
    }
};

const staffBookingController = {
    setBookingStatusToFixing,
    setBookingStatusToDone,
    getAllBookingAssignedToStaff,
};

module.exports = staffBookingController;
