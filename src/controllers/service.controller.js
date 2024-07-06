const { QUERY_SELECT_SERVICE_BY_ID } = require('../configs/queries.config');
const { selectData, isValidInteger, sendResponse } = require('../ultil.lib');
const { STATUS_CODE } = require('../configs/status.codes.config');

const getServiceById = async (req, res) => {
    if (!req.params.id) {
        sendResponse(res, STATUS_CODE.BAD_REQUEST, 'id is required');
        return;
    }

    if (!isValidInteger(req.params.id)) {
        sendResponse(res, STATUS_CODE.BAD_REQUEST, 'id must be interger');
        return;
    }

    /**FIND SERVICE */
    const selectQuery = QUERY_SELECT_SERVICE_BY_ID;
    const servicesFound = await selectData(selectQuery, [req.params.id]);

    if (servicesFound.length === 0) {
        sendResponse(res, STATUS_CODE.NOT_FOUND, 'Service not found!');
        return;
    }

    sendResponse(
        res,
        STATUS_CODE.OK,
        'Get service by id successfully!',
        servicesFound[0]
    );
};

const serviceControllers = {
    getServiceById,
};

module.exports = serviceControllers;
