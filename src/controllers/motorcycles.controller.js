const { TABLE_NAMES } = require('../configs/constants.config');
const { selectData } = require('../ultil.lib');

const getAllMotorcycles = async (req, res) => {
    const query = `
        SELECT
            m.*,
            mb.name AS brand_name
        FROM
            ${TABLE_NAMES.motorcycles} AS m
        JOIN
            ${TABLE_NAMES.motorcycle_brands} AS mb ON mb.id = m.brand_id
    `;

    const motorcycles = await selectData(query, []);

    const newList = motorcycles.map(({ brand_id, ...other }) => other);

    res.status(200).json({
        success: true,
        message: 'Get all motorcycles successfully!',
        data: newList,
    });
};

const motorcycleBrandsController = {
    getAllMotorcycles,
};

module.exports = motorcycleBrandsController;
