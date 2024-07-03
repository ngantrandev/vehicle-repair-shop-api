const { TABLE_NAMES } = require('../configs/constants.config');
const { STATUS_CODE } = require('../configs/status.codes.config');
const { selectData, isValidInteger, sendResponse } = require('../ultil.lib');

const getBrandById = async (req, res) => {
    if (!req.params.id) {
        sendResponse(res, STATUS_CODE.BAD_REQUEST, 'id is required');
        return;
    }

    if (!isValidInteger(req.params.id)) {
        sendResponse(res, STATUS_CODE.BAD_REQUEST, 'id must be interger');
        return;
    }

    /**FIND BRAND */
    const selectQuery = `SELECT * FROM ${TABLE_NAMES.motorcycle_brands} WHERE id = ?`;
    const brandsFound = await selectData(selectQuery, [req.params.id]);

    if (brandsFound.length === 0) {
        sendResponse(res, STATUS_CODE.NOT_FOUND, 'Motorcycle brand not found!');
        return;
    }

    sendResponse(
        res,
        STATUS_CODE.OK,
        'Get motorcycle brand by id successfully!',
        brandsFound[0]
    );
};

const getAllServicesByBrandId = async (req, res) => {
    if (!req.params.id) {
        sendResponse(res, STATUS_CODE.BAD_REQUEST, 'brand id is required');

        return;
    }

    if (!isValidInteger(req.params.id)) {
        sendResponse(res, STATUS_CODE.BAD_REQUEST, 'brand id must be interger');
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

    sendResponse(
        res,
        STATUS_CODE.OK,
        'get services by brand id successfully!',
        newList
    );
};

const getAllMotorcyclesByBrandId = async (req, res) => {
    if (!req.params.id) {
        sendResponse(res, STATUS_CODE.BAD_REQUEST, 'brand id is required');
        return;
    }

    if (!isValidInteger(req.params.id)) {
        sendResponse(res, STATUS_CODE.BAD_REQUEST, 'brand id must be interger');
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

    sendResponse(
        res,
        STATUS_CODE.OK,
        'get motorcycles by brand id successfully!',
        newList
    );
};

const motorcycleBrandController = {
    getBrandById,
    getAllServicesByBrandId,
    getAllMotorcyclesByBrandId,
};

module.exports = motorcycleBrandController;
