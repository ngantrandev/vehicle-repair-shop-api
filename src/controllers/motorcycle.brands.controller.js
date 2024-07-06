const { TABLE_NAMES } = require('../configs/constants.config');
const { STATUS_CODE } = require('../configs/status.codes.config');

const { selectData, sendResponse } = require('../ultil.lib');

const getAllMotorcycleBrands = async (req, res) => {
    const query = `SELECT * FROM ${TABLE_NAMES.motorcycle_brands}`;

    const brands = await selectData(query, []);

    sendResponse(
        res,
        STATUS_CODE.OK,
        'Get all motorcycle brands successfully!',
        brands
    );
};

const motorcycleBrandsController = {
    getAllMotorcycleBrands,
};

module.exports = motorcycleBrandsController;
