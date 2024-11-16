const { TABLE_NAMES } = require('../configs/constants.config');
const { STATUS_CODE } = require('../configs/status.codes.config');
const {
    selectData,
    sendResponse,
    isValidInteger,
} = require('../ultil/ultil.lib');

const getProvinces = async (req, res) => {
    try {
        const query = `SELECT * FROM ${TABLE_NAMES.provinces}`;

        const data = await selectData(query);

        sendResponse(res, STATUS_CODE.OK, 'Get provinces successfully', data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getDistrictsByProvinceId = async (req, res) => {
    try {
        const { provinceId } = req.params;

        if (!isValidInteger(provinceId)) {
            sendResponse(res, STATUS_CODE.BAD_REQUEST, 'Invalid provinceId');
            return;
        }

        const query = `
        SELECT
            id,
            name
        
        FROM ${TABLE_NAMES.districts} WHERE province_id = ?`;

        const data = await selectData(query, [provinceId]);

        sendResponse(res, STATUS_CODE.OK, 'Get districts successfully', data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getWardsByDistrictId = async (req, res) => {
    try {
        const { districtId } = req.params;

        if (!isValidInteger(districtId)) {
            sendResponse(res, STATUS_CODE.BAD_REQUEST, 'Invalid districtId');

            return;
        }

        const query = `SELECT id, name FROM ${TABLE_NAMES.wards} WHERE district_id = ?`;

        const data = await selectData(query, [districtId]);

        sendResponse(res, STATUS_CODE.OK, 'Get wards successfully', data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addressesController = {
    getProvinces,
    getDistrictsByProvinceId,
    getWardsByDistrictId,
};

module.exports = addressesController;
