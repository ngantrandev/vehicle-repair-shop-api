const { TABLE_NAMES, ACCOUNT_STATE } = require('../configs/constants.config');
const { STATUS_CODE } = require('../configs/status.codes.config');
const {
    sendResponse,
    selectData,
    isValidInteger,
} = require('../ultil/ultil.lib');

const getAllServiceStations = async (req, res) => {
    try {
        const query = `
            SELECT
                ss.id,
                ss.name,
                address.street,
                ward.name AS ward,
                district.name AS district,
                province.name AS province
                
            FROM
                ${TABLE_NAMES.service_stations} AS ss
            JOIN
                ${TABLE_NAMES.addresses} AS address ON ss.address_id = address.id
            LEFT JOIN
                ${TABLE_NAMES.wards} AS ward ON address.ward_id = ward.id
            LEFT JOIN
                ${TABLE_NAMES.districts} AS district ON ward.district_id = district.id
            LEFT JOIN
                ${TABLE_NAMES.provinces} AS province ON district.province_id = province.id
        `;

        const serviceStations = await selectData(query, []);

        sendResponse(
            res,
            STATUS_CODE.OK,
            'Get all service stations successfully!',
            serviceStations
        );
    } catch (error) {
        sendResponse(res, STATUS_CODE.INTERNAL_SERVER_ERROR, error.message);
    }
};

const getAllStaffOfServiceStation = async (req, res) => {
    try {
        const { station_id } = req.params;

        if (!station_id) {
            sendResponse(res, STATUS_CODE.BAD_REQUEST, 'missing station_id');
            return;
        }

        if (!isValidInteger(station_id)) {
            sendResponse(
                res,
                STATUS_CODE.BAD_REQUEST,
                'station_id must be an integer'
            );
            return;
        }

        const query = `
            SELECT
                s.*
            FROM ${TABLE_NAMES.staffs} AS s
            WHERE s.station_id = ? AND s.active = ${ACCOUNT_STATE.active}
        `;

        const staffs = await selectData(query, [station_id]);

        const newStaffs = staffs.map(
            ({ password, station_id, ...other }) => other
        );

        sendResponse(
            res,
            STATUS_CODE.OK,
            'Get all staffs successfully!',
            newStaffs
        );
    } catch (error) {
        sendResponse(res, STATUS_CODE.INTERNAL_SERVER_ERROR, error.message);
    }
};

const stationController = {
    getAllServiceStations,
    getAllStaffOfServiceStation,
};

module.exports = stationController;
