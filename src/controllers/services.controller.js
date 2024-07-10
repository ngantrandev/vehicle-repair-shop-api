const { TABLE_NAMES } = require('../configs/constants.config');
const { selectData, sendResponse } = require('../ultil.lib');
const { STATUS_CODE } = require('../configs/status.codes.config');

const getAllServices = async (req, res) => {
    const query = `
        SELECT ${TABLE_NAMES.services}.*,
        ${TABLE_NAMES.service_categories}.name AS category_name, 
        ${TABLE_NAMES.service_categories}.description AS category_desc 
        FROM ${TABLE_NAMES.services}
        JOIN ${TABLE_NAMES.service_categories}
        ON ${TABLE_NAMES.services}.category_id = ${TABLE_NAMES.service_categories}.id
    `;

    const services = await selectData(query, []);

    const newList = services.map(
        ({ category_id, category_name, category_desc, ...other }) => {
            other.category = {
                id: category_id,
                name: category_name,
                description: category_desc,
            };

            return other;
        }
    );

    sendResponse(
        res,
        STATUS_CODE.OK,
        'Get all services successfully!',
        newList
    );
};

const adminServicesControllers = {
    getAllServices,
};

module.exports = adminServicesControllers;
