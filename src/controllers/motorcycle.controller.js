const { TABLE_NAMES } = require('../configs/constants.config');
const { selectData, isValidInteger } = require('../ultil.lib');

const getAllServicesByMotorcycleId = async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({
            success: false,
            message: 'motorcycle id is required',
        });
    }

    if (!isValidInteger(req.params.id)) {
        res.status(400).json({
            success: false,
            message: 'motorcycle id must be interger',
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
            m.id = ?
    `;

    const motorcycles = await selectData(query, [req.params.id]);

    const newList = motorcycles.map(({ category_id, ...other }) => other);

    res.status(200).json({
        success: true,
        message: 'get services by motorcycle id successfully!',
        data: newList,
    });
};

const motorcycleBrandController = {
    getAllServicesByMotorcycleId,
};

module.exports = motorcycleBrandController;
