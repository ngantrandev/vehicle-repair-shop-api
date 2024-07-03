const { TABLE_NAMES } = require('../configs/constants.config');
const { selectData, isValidInteger, sendResponse } = require('../ultil.lib');
const { STATUS_CODE } = require('../configs/status.codes.config');

const getAllServicesByMotorcycleId = async (req, res) => {
    if (!req.params.id) {
        sendResponse(res, STATUS_CODE.BAD_REQUEST, 'motorcycle id is required');
        return;
    }

    if (!isValidInteger(req.params.id)) {
        sendResponse(
            res,
            STATUS_CODE.BAD_REQUEST,
            'motorcycle id must be interger'
        );
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
            m.id = ?
    `;

    const motorcycles = await selectData(query, [req.params.id]);

    const newList = motorcycles.map(({ category_id, ...other }) => other);

    sendResponse(
        res,
        STATUS_CODE.OK,
        'get services by motorcycle id successfully!',
        newList
    );
};

const motorcycleBrandController = {
    getAllServicesByMotorcycleId,
};

module.exports = motorcycleBrandController;
