const { TABLE_NAMES } = require('../configs/constants.config');
const { selectData, sendResponse } = require('../ultil/ultil.lib');
const { STATUS_CODE } = require('../configs/status.codes.config');

const getAllServices = async (req, res) => {
    const {
        category_id: categoryId,
        motorcycle_brand: motocycleBrand,
        key,
    } = req.query;

    /**KEY is the key word user types on search form*/

    const wheres = [];

    if (categoryId) {
        wheres.push(
            `WHERE ${TABLE_NAMES.services}.category_id = '${categoryId}'`
        );
    }
    if (motocycleBrand) {
        wheres.push(
            `WHERE ${TABLE_NAMES.service_motorcycles}.motorcycle_id = '${motocycleBrand}'`
        );
    }

    if (key) {
        const filter = `
                s.name LIKE '%${key}%' OR
                sc.name LIKE '%${key}%' OR
                m.name LIKE '%${key}%'
            `;
        wheres.push(filter);
    }

    const where = wheres.length ? `WHERE ${wheres.join(' AND ')}` : '';

    try {
        const query = `
            SELECT
                s.*,
                sc.name AS category_name,
                sc.description AS category_desc

            FROM ${TABLE_NAMES.services} AS s
            LEFT JOIN ${TABLE_NAMES.service_categories} AS sc
                ON s.category_id = sc.id
            LEFT JOIN ${TABLE_NAMES.service_motorcycles} AS sm
                ON s.id = sm.service_id
            LEFT JOIN ${TABLE_NAMES.motorcycles} AS m
                ON sm.motorcycle_id = m.id
            ${where}
            GROUP BY s.id
        
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
    } catch (error) {
        sendResponse(
            res,
            STATUS_CODE.INTERNAL_SERVER_ERROR,
            'something went wrongs!'
        );
    }
};

const adminServicesControllers = {
    getAllServices,
};

module.exports = adminServicesControllers;
