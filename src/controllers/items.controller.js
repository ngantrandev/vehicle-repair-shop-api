const { TABLE_NAMES } = require('@/src/configs/constants.config');
const { STATUS_CODE } = require('@/src/configs/status.codes.config');
const {
    selectData,
    sendResponse,
    excuteQuery,
    executeTransaction,
} = require('@/src/ultil/ultil.lib');

const getAllItem = async (req, res) => {
    try {
        const query = `
            SELECT
                i.*,
                ii.output_price price
            FROM ${TABLE_NAMES.items} i
            JOIN (
                SELECT item_id, MAX(date_input) as latest_input
                FROM items_input
                GROUP BY item_id
            ) latest ON i.id = latest.item_id
            JOIN items_input ii ON i.id = ii.item_id AND ii.date_input = latest.latest_input
            ORDER BY i.id
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

        const getPriceQuery = `
            SELECT
                output_price
            FROM ${TABLE_NAMES.items_input}
            WHERE item_id = ?
            ORDER BY date_input DESC
        `;

        const itemPrices = await selectData(getPriceQuery, [itemId]);

        if (itemPrices.length === 0) {
            sendResponse(res, STATUS_CODE.BAD_REQUEST, 'Item not found');
            return;
        }

        const query = `
            INSERT INTO ${TABLE_NAMES.bookings_items} (item_id, booking_id, count, price)
            VALUES (?, ?, 1, ?)
            ON DUPLICATE KEY UPDATE count = count + 1;
        `;

        await excuteQuery(query, [
            itemId,
            bookingId,
            itemPrices[0].output_price,
        ]);

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

        const queries = [
            `
                UPDATE ${TABLE_NAMES.bookings_items}
                SET count = count - 1
                WHERE item_id = ? AND booking_id = ?;`,
            `
                DELETE FROM ${TABLE_NAMES.bookings_items}
                WHERE item_id = ? AND booking_id = ? AND count <= 0;
            `,
        ];

        await executeTransaction(queries, [
            [itemId, bookingId],
            [itemId, bookingId],
        ]);

        sendResponse(
            res,
            STATUS_CODE.OK,
            'Remove item from booking successfully'
        );
    } catch (error) {
        sendResponse(res, STATUS_CODE.INTERNAL_SERVER_ERROR, error.message);
    }
};

const getAllItemOfBooking = async (req, res) => {
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
                i.image_url,
                bi.count AS quantity,
                bi.price
            FROM ${TABLE_NAMES.bookings_items} bi
            JOIN ${TABLE_NAMES.items} i ON bi.item_id = i.id
            WHERE bi.booking_id = ?
            GROUP BY i.id
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

const addItemToService = async (req, res) => {
    try {
        const { item_id: itemId, service_id: serviceId } = req.body;

        if (!itemId || !serviceId) {
            sendResponse(
                res,
                STATUS_CODE.BAD_REQUEST,
                'Missing item_id or service_id'
            );
            return;
        }

        const query = `
            REPLACE INTO ${TABLE_NAMES.services_items} (item_id, service_id)
            VALUES (?, ?)
        `;

        await excuteQuery(query, [itemId, serviceId]);

        sendResponse(res, STATUS_CODE.OK, 'Add item to service successfully');
    } catch (error) {
        sendResponse(res, STATUS_CODE.INTERNAL_SERVER_ERROR, error.message);
    }
};

const removeItemFromService = async (req, res) => {
    try {
        const { item_id: itemId, service_id: serviceId } = req.body;

        if (!itemId || !serviceId) {
            sendResponse(
                res,
                STATUS_CODE.BAD_REQUEST,
                'Missing item_id or service_id'
            );
            return;
        }

        const query = `
            DELETE FROM ${TABLE_NAMES.services_items}
            WHERE item_id = ? AND service_id = ?
            LIMIT 1
        `;

        await excuteQuery(query, [itemId, serviceId]);

        sendResponse(
            res,
            STATUS_CODE.OK,
            'Remove item from service successfully'
        );
    } catch (error) {
        sendResponse(res, STATUS_CODE.INTERNAL_SERVER_ERROR, error.message);
    }
};

const getAllItemOfService = async (req, res) => {
    try {
        const { service_id: serviceId } = req.query;

        if (!serviceId) {
            sendResponse(res, STATUS_CODE.BAD_REQUEST, 'Missing service_id');
            return;
        }

        const query = `
            SELECT
                i.*,
                ii.output_price price
            FROM ${TABLE_NAMES.services_items} si
            JOIN ${TABLE_NAMES.items} i ON si.item_id = i.id
            JOIN (
                SELECT item_id, MAX(date_input) as latest_input
                FROM items_input
                GROUP BY item_id
            ) latest ON i.id = latest.item_id
            JOIN items_input ii ON i.id = ii.item_id AND ii.date_input = latest.latest_input
            WHERE si.service_id = ?
            GROUP BY i.id
        `;

        const items = await selectData(query, [serviceId]);

        sendResponse(
            res,
            STATUS_CODE.OK,
            'Get service items successfully',
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
    getAllItemOfBooking,
    addItemToService,
    removeItemFromService,
    getAllItemOfService,
};
