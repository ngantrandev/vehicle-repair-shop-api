const { TABLE_NAMES } = require('../configs/constants.config');
const { selectData } = require('../ultil.lib');

const getAllMotorcycleBrands = async (req, res) => {
    const query = `SELECT * FROM ${TABLE_NAMES.motorcycle_brands}`;

    const brands = await selectData(query, []);

    res.status(200).json({
        success: true,
        message: 'Get all motorcycle brands successfully!',
        data: brands,
    });
};

const motorcycleBrandsController = {
    getAllMotorcycleBrands,
};

module.exports = motorcycleBrandsController;
