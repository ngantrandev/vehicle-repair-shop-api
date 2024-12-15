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
        const { start_date, end_date } = req.query;
        const where = [];
        const args = [];

        if (start_date && end_date) {
            where.push(`outp.date_output BETWEEN ? AND ?`);
            args.push(start_date);
            args.push(end_date);
        }
        const query = `
            SELECT 
                i.*,
                COALESCE(input_data.total_input, 0) AS total_input,
                COALESCE(output_data.total_output, 0) AS total_output
            FROM items i
            LEFT JOIN (
                SELECT 
                    ii.item_id,
                    SUM(ii.count) AS total_input
                FROM input_info ii
                JOIN inputs inp ON ii.input_id = inp.id 
                GROUP BY ii.item_id
            ) input_data ON i.id = input_data.item_id
            LEFT JOIN (
                SELECT 
                    io.item_id,
                    SUM(io.count) AS total_output
                FROM output_info io
                JOIN outputs outp ON io.output_id = outp.id 
                ${where.length > 0 ? `WHERE ${where.join(' AND ')}` : ''}
                GROUP BY io.item_id
            ) output_data ON i.id = output_data.item_id
            ORDER BY i.id;

         `;

        const items = await selectData(query, args);

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
            FROM ${TABLE_NAMES.input_info} ii
            INNER JOIN ${TABLE_NAMES.inputs} ON ${TABLE_NAMES.inputs}.id = ii.input_id
            WHERE item_id = ?
            ORDER BY ${TABLE_NAMES.inputs}.date_input DESC
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
                ii.output_price AS price
            FROM ${TABLE_NAMES.services_items} si
            JOIN ${TABLE_NAMES.items} i ON si.item_id = i.id
            JOIN (
                SELECT 
                    ii.item_id, 
                    MAX(inp.date_input) AS latest_input
                FROM ${TABLE_NAMES.input_info} ii
                JOIN ${TABLE_NAMES.inputs} inp ON ii.input_id = inp.id
                GROUP BY ii.item_id
            ) latest ON i.id = latest.item_id
            JOIN ${TABLE_NAMES.input_info} ii 
                ON i.id = ii.item_id
            JOIN ${TABLE_NAMES.inputs} inp ON ii.input_id = inp.id AND inp.date_input = latest.latest_input
            WHERE si.service_id = ?
            ORDER BY i.id;
        `;

        const items = await selectData(query, [serviceId]);

        sendResponse(
            res,
            STATUS_CODE.OK,
            'Get service items successfully',
            items
        );
    } catch (error) {
        console.log(error);
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
