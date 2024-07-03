const { TABLE_NAMES } = require('../configs/constants.config');
const { selectData, isValidInteger } = require('../ultil.lib');

const getAllUserCarts = async (req, res) => {
    if (!req.params.user_id) {
        return res.status(400).json({
            success: false,
            message: 'user id is required',
        });
    }

    if (!isValidInteger(req.params.user_id)) {
        res.status(400).json({
            success: false,
            message: 'user id must be interger',
        });
        return;
    }

    /**NO NEED TO FIND USER
     * BECAUSE JUST DONE ON THE MIDDLEWARE BEFORE
     */
    // const findQuery = `SELECT * FROM ${TABLE_NAMES.users} WHERE id = ?`;
    // const usersFound = await selectData(findQuery, [req.params.user_id]);

    // if (usersFound.length === 0) {
    //     res.status(404).json({
    //         success: false,
    //         message: 'user not found!',
    //     });
    //     return;
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

    res.status(200).json({
        success: true,
        message: 'Get all services successfully!',
        data: userCarts,
    });
};

const cartsController = {
    getAllUserCarts,
};

module.exports = cartsController;
