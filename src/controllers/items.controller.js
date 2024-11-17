const { TABLE_NAMES } = require('../configs/constants.config');
const { STATUS_CODE } = require('../configs/status.codes.config');
const { selectData, sendResponse } = require('../ultil/ultil.lib');

const getAllItem = async (req, res) => {
    try {
        const query = `
           SELECT * FROM ${TABLE_NAMES.items}
        `;

        const items = await selectData(query, []);

        sendResponse(res, STATUS_CODE.OK, 'Get items successfully', items);
    } catch (error) {
        sendResponse(res, STATUS_CODE.INTERNAL_SERVER_ERROR, error.message);
    }
};

module.exports = {
    getAllItem,
};
