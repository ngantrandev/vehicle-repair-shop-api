const {
    selectData,
    isValidInteger,
    sendResponse,
    convertTimeToGMT7,
} = require('../ultil.lib');
const { STATUS_CODE } = require('../configs/status.codes.config');
const { TABLE_NAMES } = require('../configs/constants.config');

const getAllBookingByUserId = async (req, res) => {
    try {
        /**FIND SERVICE */
        const selectQuery = `
        SELECT
            b.*,
            s.name AS service_name,
            s.price AS service_price,
            stf.id AS staff_id,
            stf.firstname AS staff_firstname,
            stf.lastname AS staff_lastname
        FROM
            ${TABLE_NAMES.bookings} AS b
        LEFT JOIN
            ${TABLE_NAMES.services} AS s ON s.id = b.service_id
        LEFT JOIN
            ${TABLE_NAMES.staffs} AS stf ON stf.id = b.staff_id
        WHERE user_id = ?
 `;

        const bookings = await selectData(selectQuery, [
            req.params.user_id,
            req.params.booking_id,
        ]);

        const newList = bookings.map(
            ({
                service_id,
                service_name,
                service_price,
                user_id,
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
    getAllBookingByUserId,
};

module.exports = bookingsController;
