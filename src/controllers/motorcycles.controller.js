const { TABLE_NAMES } = require('../configs/constants.config');
const { selectData, sendResponse } = require('../ultil/ultil.lib');
const { STATUS_CODE } = require('../configs/status.codes.config');

const getAllMotorcycles = async (req, res) => {
    try {
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

        const newList = motorcycles.map(
            ({ brand_id, brand_name, ...other }) => {
                other.brand = {
                    id: brand_id,
                    name: brand_name,
                };

                return other;
            }
        );

        sendResponse(
            res,
            STATUS_CODE.OK,
            'Get all motorcycles successfully!',
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

const motorcycleBrandsController = {
    getAllMotorcycles,
};

module.exports = motorcycleBrandsController;
