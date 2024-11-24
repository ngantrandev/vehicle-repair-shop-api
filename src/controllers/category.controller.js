const { TABLE_NAMES } = require('@/src/configs/constants.config');
const { STATUS_CODE } = require('@/src/configs/status.codes.config');
const { excuteQuery, sendResponse } = require('@/src/ultil/ultil.lib');

const getServiceCategory = async (req, res) => {
    try {
        const query = `SELECT * FROM ${TABLE_NAMES.service_categories}`;

        const categories = await excuteQuery(query, []);

        sendResponse(
            res,
            STATUS_CODE.OK,
            'Get service categories successfully',
            categories
        );
    } catch (error) {
        sendResponse(
            res,
            STATUS_CODE.INTERNAL_SERVER_ERROR,
            'Internal Server Error'
        );
    }
};

const categoriesController = {
    getServiceCategory,
};

module.exports = categoriesController;
