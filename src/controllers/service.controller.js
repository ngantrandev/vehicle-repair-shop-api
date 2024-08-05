const { QUERY_SELECT_SERVICE_BY_ID } = require('../configs/queries.config');
const {
    selectData,
    isValidInteger,
    sendResponse,
} = require('../ultil/ultil.lib');
const { STATUS_CODE } = require('../configs/status.codes.config');

const getServiceById = async (req, res) => {
    if (!req.params.service_id) {
        sendResponse(res, STATUS_CODE.BAD_REQUEST, 'service_id is required');
        return;
    }

    if (!isValidInteger(req.params.service_id)) {
        sendResponse(
            res,
            STATUS_CODE.BAD_REQUEST,
            'service_id must be interger'
        );
        return;
    }

    try {
        /**FIND SERVICE */
        const selectQuery = QUERY_SELECT_SERVICE_BY_ID;
        const servicesFound = await selectData(selectQuery, [
            req.params.service_id,
        ]);

        if (servicesFound.length === 0) {
            sendResponse(res, STATUS_CODE.NOT_FOUND, 'Service not found!');
            return;
        }

        const { category_id, category_name, category_desc, ...other } =
            servicesFound[0];
        other.category = {
            id: category_id,
            name: category_name,
            description: category_desc,
        };

        sendResponse(
            res,
            STATUS_CODE.OK,
            'Get service by id successfully!',
            other
        );
    } catch (error) {
        sendResponse(
            res,
            STATUS_CODE.INTERNAL_SERVER_ERROR,
            'Something went wrongs!'
        );
    }
};

const serviceControllers = {
    getServiceById,
};

module.exports = serviceControllers;
