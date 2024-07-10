const { TABLE_NAMES, BOOKING_STATE } = require('../configs/constants.config');
const { STATUS_CODE } = require('../configs/status.codes.config');
const {
    sendResponse,
    isValidInteger,
    excuteQuery,
    selectData,
    getCurrentTimeInGMT7,
    executeTransaction,
    getIdOfNearestStation,
    getIdOfTheMostFreeStaff,
} = require('../ultil.lib');

const createCart = async (req, res) => {
    const requiredFields = ['service_id'];

    for (const field of requiredFields) {
        if (!req.body[field]) {
            sendResponse(
                res,
                STATUS_CODE.BAD_REQUEST,
                `Missing required field: ${field}`
            );
            return;
        }
    }

    /** VALIDATE VALUE TYPE */

    if (!isValidInteger(req.body.service_id)) {
        sendResponse(
            res,
            STATUS_CODE.BAD_REQUEST,
            `service_id must be integer`
        );
        return;
    }

    try {
        /**CHECK SERVICE */
        const queryCheckService = `SELECT * FROM ${TABLE_NAMES.services} WHERE id = ?`;
        const services = await excuteQuery(queryCheckService, [
            req.body.service_id,
        ]);
        if (services.length === 0) {
            sendResponse(res, STATUS_CODE.NOT_FOUND, `Service not found`);
            return;
        }

        /** CREATE CART */

        const insertedFields = requiredFields.map((field) => ` ${field}`);

        const queryCreate = `INSERT INTO ${TABLE_NAMES.carts} (${insertedFields}, user_id) VALUES (?, ?)`;

        const result = await excuteQuery(queryCreate, [
            req.body.service_id,
            req.params.user_id,
        ]);

        if (!result) {
            sendResponse(
                res,
                STATUS_CODE.INTERNAL_SERVER_ERROR,
                'Cannot create cart at this time!'
            );

            return;
        }

        sendResponse(res, STATUS_CODE.OK, 'Created cart successfully!');
    } catch (error) {
        sendResponse(
            res,
            STATUS_CODE.INTERNAL_SERVER_ERROR,
            'something went wrong!'
        );
    }
};

const createBookingFromCart = async (req, res) => {
    if (!req.params.cart_id) {
        sendResponse(
            res,
            STATUS_CODE.BAD_REQUEST,
            'Missing required param: cart_id'
        );
        return;
    }

    if (!req.body.ward_id) {
        sendResponse(res, STATUS_CODE.BAD_REQUEST, `ward_id is required`);
        return;
    }
    if (!req.body.street) {
        sendResponse(res, STATUS_CODE.BAD_REQUEST, `street is required`);
        return;
    }

    if (!isValidInteger(req.params.cart_id)) {
        sendResponse(
            res,
            STATUS_CODE.BAD_REQUEST,
            'cart_id must be an integer'
        );
        return;
    }

    if (req.body.latitude && !isValidDouble(req.body.latitude)) {
        sendResponse(res, STATUS_CODE.BAD_REQUEST, `latitude must be double`);
        return;
    }
    if (req.body.longitude && !isValidDouble(req.body.longitude)) {
        sendResponse(res, STATUS_CODE.BAD_REQUEST, `longitude must be double`);
        return;
    }

    try {
        const checkCartExistQuery = `SELECT * FROM ${TABLE_NAMES.carts} WHERE id = ?`;
        const carts = await selectData(checkCartExistQuery, [
            req.params.cart_id,
        ]);
        if (carts.length === 0) {
            sendResponse(res, STATUS_CODE.NOT_FOUND, 'Cart not found');
            return;
        }

        /** auto choose staffid if user give latitude and longitude */
        const stationId = await getIdOfNearestStation(
            req.body.latitude,
            req.body.longitude
        );

        const staffId = await getIdOfTheMostFreeStaff(stationId);

        const queries = [
            `DELETE FROM ${TABLE_NAMES.carts} WHERE id = ?;`,
            `INSERT INTO ${TABLE_NAMES.addresses} (latitude, longitude, ward_id, street) VALUES (?, ?, ?, ?);`,
            'SET @address_id = LAST_INSERT_ID();',
            `INSERT INTO ${TABLE_NAMES.bookings} (service_id, note, user_id, created_at, modified_at, address_id, status, staff_id) VALUES (?, ?, ?, ?, ?, @address_id, ?, ?);`,
        ];
        const createdTime = getCurrentTimeInGMT7();

        const params = [
            [req.params.cart_id],
            [
                req.body.latitude,
                req.body.longitude,
                req.body.ward_id,
                req.body.street,
            ],
            [],
            [
                carts[0].service_id,
                req.body.note,
                req.params.user_id,
                createdTime,
                createdTime,
                BOOKING_STATE.pending,
                staffId ? staffId.toString() : null,
            ],
        ];

        await executeTransaction(queries, params);

        sendResponse(res, STATUS_CODE.OK, 'Created booking successfully!');
    } catch (error) {
        console.log(error);
        sendResponse(
            res,
            STATUS_CODE.INTERNAL_SERVER_ERROR,
            'something went wrongs!'
        );
    }
};

const deleteCartById = async (req, res) => {
    if (!req.params.cart_id) {
        sendResponse(
            res,
            STATUS_CODE.BAD_REQUEST,
            'Missing required param: cart_id'
        );
        return;
    }

    if (!isValidInteger(req.params.cart_id)) {
        sendResponse(
            res,
            STATUS_CODE.BAD_REQUEST,
            'cart_id must be an integer'
        );
        return;
    }

    const query = `DELETE FROM ${TABLE_NAMES.carts} WHERE id = ?`;
    const result = await excuteQuery(query, [req.params.cart_id]);

    if (!result) {
        sendResponse(
            res,
            STATUS_CODE.INTERNAL_SERVER_ERROR,
            'Cannot delete cart at this time!'
        );
        return;
    }

    if (result.affectedRows === 0) {
        sendResponse(res, STATUS_CODE.NOT_FOUND, 'Cart not found');
        return;
    }

    sendResponse(res, STATUS_CODE.OK, 'Deleted cart successfully!');
};

const cartController = {
    createCart,
    createBookingFromCart,
    deleteCartById,
};

module.exports = cartController;
