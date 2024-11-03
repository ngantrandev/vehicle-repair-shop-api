const { TABLE_NAMES } = require('../configs/constants.config');
const { selectData, sendResponse } = require('../ultil/ultil.lib');
const { STATUS_CODE } = require('../configs/status.codes.config');

const getAllServices = async (req, res) => {
    const {
        category_id: categoryId,
        motorcycle_brand: motocycleBrand,
        key,
        active,
    } = req.query;

    /**KEY is the key word user types on search form*/

    const wheres = [];

    if (active) {
        wheres.push(`s.active = 1`);
    }

    if (categoryId) {
        wheres.push(`s.category_id = '${categoryId}'`);
    }
    if (motocycleBrand) {
        wheres.push(`sm.motorcycle_id = '${motocycleBrand}'`);
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

const getTopServices = async (req, res) => {
    try {
        const query = `
        SELECT
            s.*,
            sc.name AS category_name,
            sc.description AS category_desc,
            GROUP_CONCAT(DISTINCT m.name ORDER BY m.name ASC SEPARATOR ', ') AS motorcycle_names
        FROM (
            SELECT service_id, COUNT(*) AS TOTAL_BOOKINGS
            FROM bookings
            GROUP BY service_id
            ORDER BY TOTAL_BOOKINGS DESC
            LIMIT 5
        ) AS top_services
        JOIN services AS s ON top_services.service_id = s.id
        LEFT JOIN service_categories AS sc ON s.category_id = sc.id
        LEFT JOIN service_motorcycles AS sm ON s.id = sm.service_id
        LEFT JOIN motorcycles AS m ON sm.motorcycle_id = m.id
        WHERE s.active = 1
        GROUP BY s.id, sc.name, sc.description, top_services.TOTAL_BOOKINGS
        ORDER BY top_services.TOTAL_BOOKINGS DESC;
    
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
            'Get all top services successfully!',
            newList
        );
    } catch (error) {
        sendResponse(
            res,
            STATUS_CODE.INTERNAL_SERVER_ERROR,
            'something went wrongs!' + error
        );
    }
};

const adminServicesControllers = {
    getAllServices,
    getTopServices,
};

module.exports = adminServicesControllers;
