const { TABLE_NAMES } = require('../configs/constants.config');
const { STATUS_CODE } = require('../configs/status.codes.config');
const { selectData, sendResponse, excuteQuery } = require('../ultil/ultil.lib');

const getAllItem = async (req, res) => {
    try {
        const query = `
           SELECT * FROM ${TABLE_NAMES.items}
        `;

        const items = await selectData(query, []);

        sendResponse(res, STATUS_CODE.OK, 'Get items successfully', items);
    } catch (error) {
        sendResponse(res, STATUS_CODE.INTERNAL_SERVER_ERROR, error.message);
    }
};

const addItemToBooking = async (req, res) => {
    try {
        const { item_id: itemId, booking_id: bookingId } = req.body;

        if (!itemId || !bookingId) {
            sendResponse(
                res,
                STATUS_CODE.BAD_REQUEST,
                'Missing item_id or booking_id'
            );
            return;
        }

        const query = `
            INSERT INTO ${TABLE_NAMES.booking_items} (item_id, booking_id)
            VALUES (?, ?)
        `;

        await excuteQuery(query, [itemId, bookingId]);

        sendResponse(res, STATUS_CODE.OK, 'Add item to booking successfully');
    } catch (error) {
        sendResponse(res, STATUS_CODE.INTERNAL_SERVER_ERROR, error.message);
    }
};

const removeItemFromBooking = async (req, res) => {
    try {
        const { item_id: itemId, booking_id: bookingId } = req.body;

        if (!itemId || !bookingId) {
            sendResponse(
                res,
                STATUS_CODE.BAD_REQUEST,
                'Missing item_id or booking_id'
            );
            return;
        }

        const query = `
            DELETE FROM ${TABLE_NAMES.booking_items}
            WHERE item_id = ? AND booking_id = ?
            LIMIT 1
        `;

        await excuteQuery(query, [itemId, bookingId]);

        sendResponse(
            res,
            STATUS_CODE.OK,
            'Remove item from booking successfully'
        );
    } catch (error) {
        sendResponse(res, STATUS_CODE.INTERNAL_SERVER_ERROR, error.message);
    }
};

const getBookingItems = async (req, res) => {
    try {
        const { booking_id: bookingId } = req.query;

        if (!bookingId) {
            sendResponse(res, STATUS_CODE.BAD_REQUEST, 'Missing booking_id');
            return;
        }

        const query = `
            SELECT
                i.id,
                i.name,
                i.price,
                i.image_url,
                COUNT(i.id) as quantity
            FROM ${TABLE_NAMES.booking_items} bi
            JOIN ${TABLE_NAMES.items} i ON bi.item_id = i.id
            WHERE bi.booking_id = ?
            GROUP BY i.id, i.name, i.price
        `;

        const items = await selectData(query, [bookingId]);

        sendResponse(
            res,
            STATUS_CODE.OK,
            'Get booking items successfully',
            items
        );
    } catch (error) {
        sendResponse(res, STATUS_CODE.INTERNAL_SERVER_ERROR, error.message);
    }
};

module.exports = {
    getAllItem,
    addItemToBooking,
    removeItemFromBooking,
    getBookingItems,
};
