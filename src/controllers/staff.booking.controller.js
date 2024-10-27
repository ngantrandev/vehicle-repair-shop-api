const { BOOKING_STATE, TABLE_NAMES } = require('../configs/constants.config');
const { STATUS_CODE } = require('../configs/status.codes.config');
const {
    isValidInteger,
    selectData,
    excuteQuery,
    sendResponse,
    convertTimeToGMT7,
} = require('../ultil/ultil.lib');

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

        const updateBooking = `UPDATE ${TABLE_NAMES.bookings} SET status = ?, pre_status = ?, note = ? WHERE id = ?`;
        await excuteQuery(updateBooking, [
            BOOKING_STATE.fixing,
            bookingsFound[0].status,
            req.body.note,
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

// const setBookingStatusToDone = async (req, res) => {
//     if (!req.params.booking_id) {
//         sendResponse(res, STATUS_CODE.BAD_REQUEST, 'booking_id is required');
//         return;
//     }

//     if (!isValidInteger(req.params.booking_id)) {
//         sendResponse(
//             res,
//             STATUS_CODE.BAD_REQUEST,
//             'booking_id must be integer'
//         );
//         return;
//     }

//     try {
//         const checkExistBooking = `SELECT * FROM ${TABLE_NAMES.bookings} WHERE id = ? AND staff_id = ?`;
//         const bookingsFound = await selectData(checkExistBooking, [
//             req.params.booking_id,
//             req.params.staff_id,
//         ]);

//         if (bookingsFound.length === 0) {
//             sendResponse(
//                 res,
//                 STATUS_CODE.NOT_FOUND,
//                 'this booking does not belong to this staff!'
//             );
//             return;
//         }

//         if (bookingsFound[0].status === BOOKING_STATE.pending) {
//             sendResponse(
//                 res,
//                 STATUS_CODE.UNPROCESSABLE_ENTITY,
//                 'booking has not been confirmed yet!'
//             );
//             return;
//         }

//         if (bookingsFound[0].status === BOOKING_STATE.cancelled) {
//             sendResponse(
//                 res,
//                 STATUS_CODE.CONFLICT,
//                 'booking has been already cancelled!'
//             );
//             return;
//         }

//         if (bookingsFound[0].status === BOOKING_STATE.done) {
//             sendResponse(
//                 res,
//                 STATUS_CODE.CONFLICT,
//                 'booking has been already set to done status!'
//             );
//             return;
//         }

//         const updateBooking = `UPDATE ${TABLE_NAMES.bookings} SET status = ? WHERE id = ?`;
//         await excuteQuery(updateBooking, [
//             BOOKING_STATE.done,
//             req.params.booking_id,
//         ]);

//         sendResponse(
//             res,
//             STATUS_CODE.OK,
//             'booking status changed to done successfully!'
//         );
//     } catch (error) {
//         sendResponse(
//             res,
//             STATUS_CODE.INTERNAL_SERVER_ERROR,
//             'something went wrongs!'
//         );
//     }
// };

const getAllBookingAssignedToStaff = async (req, res) => {
    try {
        const query = `
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

            FROM ( SELECT *
                    FROM ${TABLE_NAMES.bookings}
                    WHERE staff_id = ? ) AS b
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
        `;

        const bookings = await selectData(query, [req.tokenPayload.user_id]);

        const newBookings = bookings.map(
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
                other.modified_at = convertTimeToGMT7(other.modified_at);

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
    getAllBookingAssignedToStaff,
};

module.exports = staffBookingController;
