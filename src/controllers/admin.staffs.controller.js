const { TABLE_NAMES } = require('@/src/configs/constants.config');
const { STATUS_CODE } = require('@/src/configs/status.codes.config');
const {
    selectData,
    convertDateToGMT7,
    convertTimeToGMT7,
    sendResponse,
} = require('@/src/ultil/ultil.lib');

const getAllStaffs = async (req, res) => {
    try {
        const query = `
        SELECT
            s.*,
            ss.name AS service_station_name,
            IFNULL(COUNT(b.id), 0) AS current_tasks
        FROM ${TABLE_NAMES.staffs} AS s
        JOIN ${TABLE_NAMES.service_stations} AS ss ON s.station_id = ss.id
        LEFT JOIN ${TABLE_NAMES.bookings} b ON s.id = b.staff_id AND b.status NOT IN ('cancelled', 'done')
        GROUP BY s.id
        ORDER BY current_tasks DESC
    `;

        const staffs = await selectData(query, []);

        const newStaffs = staffs.map(
            // eslint-disable-next-line no-unused-vars
            ({ password, station_id, service_station_name, ...other }) => {
                other.birthday = convertDateToGMT7(other.birthday);
                other.created_at = convertTimeToGMT7(other.created_at);

                other.service_station = {
                    id: station_id,
                    name: service_station_name,
                };
                return other;
            }
        );

        sendResponse(
            res,
            STATUS_CODE.OK,
            'Get all staffs successfully!',
            newStaffs
        );
    } catch (error) {
        sendResponse(
            res,
            STATUS_CODE.INTERNAL_SERVER_ERROR,
            'something went wrong' + error.message
        );
    }
};

const adminStaffsController = {
    getAllStaffs,
};

module.exports = adminStaffsController;
