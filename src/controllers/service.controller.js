const { TABLE_NAMES } = require('../configs/constants.config');
const { QUERY_SELECT_SERVICE_BY_ID } = require('../configs/queries.config');
const { selectData, isValidInteger } = require('../ultil.lib');

const getServiceById = async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({
            success: false,
            message: 'id is required',
        });
    }

    if (!isValidInteger(req.params.id)) {
        res.status(400).json({
            success: false,
            message: 'id must be interger',
        });
        return;
    }

    /**FIND SERVICE */
    const selectQuery = QUERY_SELECT_SERVICE_BY_ID;
    const servicesFound = await selectData(selectQuery, [req.params.id]);

    if (servicesFound.length === 0) {
        res.status(404).json({
            success: false,
            message: 'Service not found!',
        });
        return;
    }

    res.status(200).json({
        success: true,
        message: 'Get service by id successfully!',
        data: servicesFound[0],
    });
};

const serviceControllers = {
    getServiceById,
};

module.exports = serviceControllers;
