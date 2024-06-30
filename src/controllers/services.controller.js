const { TABLE_NAMES } = require('../configs/constants.config');
const { selectData } = require('../ultil.lib');

const getAllServices = async (req, res) => {
    const query = `
            SELECT ${TABLE_NAMES.services}.*, ${TABLE_NAMES.service_categories}.name AS category_name, ${TABLE_NAMES.service_categories}.description AS category_desc 
            FROM ${TABLE_NAMES.services}
            JOIN ${TABLE_NAMES.service_categories}
            ON ${TABLE_NAMES.services}.category_id = ${TABLE_NAMES.service_categories}.id
        `;

    const services = await selectData(query, []);

    res.status(200).json({
        success: false,
        message: 'Get all services successfully!',
        data: services,
    });
};

const adminServicesControllers = {
    getAllServices,
};

module.exports = adminServicesControllers;
