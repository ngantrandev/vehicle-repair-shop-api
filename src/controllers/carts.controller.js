const { TABLE_NAMES } = require('../configs/constants.config');
const { STATUS_CODE } = require('../configs/status.codes.config');
const { selectData, isValidInteger, sendResponse } = require('../ultil.lib');

const getAllUserCarts = async (req, res) => {
    /**NO NEED TO FIND USER
     * BECAUSE JUST DONE ON THE MIDDLEWARE BEFORE
     */
    // if (!isValidInteger(req.params.user_id)) {
    //     rn;
    // }
    // const findQuery = `SELECT * FROM ${TABLE_NAMES.users} WHERE id = ?`;
    // const usersFound = await selectData(findQuery, [req.params.user_id]);

    // if (usersFound.length === 0) {
    //     rn;
    // }

    const query = `
        SELECT
            c.id,
            s.name AS service_name,
            s.image_url AS service_image_url,
            s.price AS service_price

        FROM ${TABLE_NAMES.carts} AS c
        JOIN
            ${TABLE_NAMES.services} AS s ON s.id = c.service_id
        WHERE c.user_id = ?
    `;

    const userCarts = await selectData(query, [req.params.user_id]);

    sendResponse(
        res,
        STATUS_CODE.OK,
        'Get all user carts successfully!',
        userCarts
    );
};

const cartsController = {
    getAllUserCarts,
};

module.exports = cartsController;
