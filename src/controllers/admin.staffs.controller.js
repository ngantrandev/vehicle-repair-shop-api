const { TABLE_NAMES } = require('../configs/constants.config');
const { STATUS_CODE } = require('../configs/status.codes.config');
const {
    selectData,
    convertDateToGMT7,
    convertTimeToGMT7,
    sendResponse,
} = require('../ultil.lib');

const getAllStaffs = async (req, res) => {
    const query = `
        SELECT
            s.*,
            ss.name AS service_station_name
        FROM ${TABLE_NAMES.staffs} AS s
        JOIN ${TABLE_NAMES.service_stations} AS ss
            ON s.station_id = ss.id
    `;

    const staffs = await selectData(query, []);

    const newStaffs = staffs.map(({ password, station_id, ...other }) => {
        other.birthday = convertDateToGMT7(other.birthday);
        other.created_at = convertTimeToGMT7(other.created_at);

        return other;
    });

    sendResponse(
        res,
        STATUS_CODE.OK,
        'Get all staffs successfully!',
        newStaffs
    );
};

const adminStaffsController = {
    getAllStaffs,
};

module.exports = adminStaffsController;