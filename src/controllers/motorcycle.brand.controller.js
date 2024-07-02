const { TABLE_NAMES } = require('../configs/constants.config');
const { selectData, isValidInteger } = require('../ultil.lib');

const getBrandById = async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({
            success: false,
            message: 'brand id is required',
        });
    }

    if (!isValidInteger(req.params.id)) {
        res.status(400).json({
            success: false,
            message: 'brand id must be interger',
        });
        return;
    }

    /**FIND BRAND */
    const selectQuery = `SELECT * FROM ${TABLE_NAMES.motorcycle_brands} WHERE id = ?`;
    const brandsFound = await selectData(selectQuery, [req.params.id]);

    if (brandsFound.length === 0) {
        res.status(404).json({
            success: false,
            message: 'Motorcycle brand not found!',
        });
        return;
    }

    res.status(200).json({
        success: true,
        message: 'Get motorcycle brand by id successfully!',
        data: brandsFound[0],
    });
};

const getAllServicesByBrandId = async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({
            success: false,
            message: 'brand id is required',
        });
    }

    if (!isValidInteger(req.params.id)) {
        res.status(400).json({
            success: false,
            message: 'brand id must be interger',
        });
        return;
    }

    const query = `
            SELECT DISTINCT
                s.*,
                sc.name AS category_name,
                sc.description AS category_desc
            FROM
                ${TABLE_NAMES.services} AS s
            JOIN
                ${TABLE_NAMES.service_categories} AS sc ON sc.id = s.category_id
            JOIN
                ${TABLE_NAMES.service_motorcycles} AS sm ON sm.service_id = s.id
            JOIN
                ${TABLE_NAMES.motorcycles} AS m ON m.id = sm.motorcycle_id
            JOIN
                ${TABLE_NAMES.motorcycle_brands} AS mb ON mb.id = m.brand_id
            WHERE
                mb.id = ?
        `;

    const motorcycles = await selectData(query, [req.params.id]);

    const newList = motorcycles.map(({ category_id, ...other }) => other);

    res.status(200).json({
        success: true,
        message: 'get services by brand id successfully!',
        data: newList,
    });
};

const getAllMotorcyclesByBrandId = async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({
            success: false,
            message: 'brand id is required',
        });
    }

    if (!isValidInteger(req.params.id)) {
        res.status(400).json({
            success: false,
            message: 'brand id must be interger',
        });
        return;
    }

    const query = `
        SELECT
            m.*,
            mb.name AS brand_name
        FROM ${TABLE_NAMES.motorcycles} AS m
        JOIN ${TABLE_NAMES.motorcycle_brands} as mb
            ON mb.id = m.brand_id
    `;

    const motorcycles = await selectData(query, []);

    const newList = motorcycles.map(({ brand_id, ...other }) => other);

    res.status(200).json({
        success: true,
        message: 'get motorcycles by brand id successfully!',
        data: newList,
    });
};

const motorcycleBrandController = {
    getBrandById,
    getAllServicesByBrandId,
    getAllMotorcyclesByBrandId,
};

module.exports = motorcycleBrandController;
