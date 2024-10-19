const {
    selectData,
    sendResponse,
    convertTimeToGMT7,
} = require('../ultil/ultil.lib');
const { STATUS_CODE } = require('../configs/status.codes.config');
const { TABLE_NAMES, USER_ROLES } = require('../configs/constants.config');

const getAllBooking = async (req, res) => {
    console.log('get all booking');
    try {
        let where = 'WHERE user_id = ?';
        if (req.tokenPayload.role === USER_ROLES.admin) {
            where = '';
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
        ${where}
 `;

        const bookings = await selectData(selectQuery, [
            req.tokenPayload.user_id,
        ]);

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
                    name: address_name,
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
            'something went wrong'
        );
    }
};

const bookingsController = {
    getAllBooking,
};

module.exports = bookingsController;
