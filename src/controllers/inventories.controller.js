const { STATUS_CODE } = require('@/src/configs/status.codes.config');
const {
    sendResponse,
    selectData,
    executeTransaction,
} = require('@/src/ultil/ultil.lib');
const { TABLE_NAMES } = require('@/src/configs/constants.config');
const utils = require('@/src/ultil/ultil.lib');

const importGoods = async (req, res) => {
    try {
        const data = req.body;

        const date = new Date();

        const queries = [];
        const args = [];

        queries.push(
            `INSERT INTO ${TABLE_NAMES.inputs} (date_input) VALUES (?)`
        );
        args.push([date]);

        queries.push('SET @input_id = LAST_INSERT_ID()');
        args.push([]);

        queries.push(`
            INSERT INTO ${TABLE_NAMES.input_info} (input_id, item_id, count, input_price, output_price)
            VALUES ${data.map(() => '(@input_id,?,?,?,?)').join(',')};     
        `);

        args.push(
            data.reduce((acc, item) => {
                acc.push(item.item_id);
                acc.push(item.count);
                acc.push(item.input_price);
                acc.push(item.output_price);
                return acc;
            }, [])
        );

        await executeTransaction(queries, args);

        sendResponse(res, STATUS_CODE.OK, 'Import goods successfully');
    } catch (error) {
        sendResponse(res, STATUS_CODE.INTERNAL_SERVER_ERROR, error.message);
    }
};

const getImportList = async (req, res) => {
    try {
        const { item_id } = req.query;

        const where = [];
        const args = [];

        if (item_id) {
            where.push(`item_id = ?`);
            args.push(item_id);
        }

        const query = `
            SELECT * FROM ${TABLE_NAMES.input_info}
            ${where.length ? `WHERE ${where.join(' AND ')}` : ''}
        `;

        const result = await selectData(query, args);

        sendResponse(res, STATUS_CODE.OK, result);
    } catch (error) {
        sendResponse(res, STATUS_CODE.INTERNAL_SERVER_ERROR, error.message);
    }
};

const getExportList = async (req, res) => {
    try {
        const { item_id } = req.query;

        const where = [];
        const args = [];

        if (item_id) {
            where.push(`item_id = ?`);
            args.push(item_id);
        }

        const query = `
            SELECT * FROM ${TABLE_NAMES.output_info}
            ${where.length ? `WHERE ${where.join(' AND ')}` : ''}
        `;

        const result = await selectData(query, args);

        sendResponse(res, STATUS_CODE.OK, result);
    } catch (error) {
        sendResponse(res, STATUS_CODE.INTERNAL_SERVER_ERROR, error.message);
    }
};

const getImportNotes = async (req, res) => {
    try {
        const query = `
            SELECT
                i.*,
                ii.*,
                it.name item_name
            FROM ${TABLE_NAMES.inputs} i
            INNER JOIN ${TABLE_NAMES.input_info} ii ON i.id = ii.input_id
            INNER JOIN ${TABLE_NAMES.items} it ON ii.item_id = it.id
        
        `;

        const result = await selectData(query);

        const grouped = {};

        result.forEach((element) => {
            const {
                date_input,
                input_id,
                item_id,
                count,
                input_price,
                output_price,
                item_name,
            } = element;
            if (!grouped[input_id]) {
                grouped[input_id] = {
                    id: input_id,
                    date_input: utils.convertTimeToGMT7(date_input),
                    total_price: 0,
                    items: [],
                };
            }

            grouped[input_id].items.push({
                item_id,
                count,
                input_price,
                output_price,
                item_name,
            });

            grouped[input_id].total_price += count * input_price;
        });

        const newList = Object.values(grouped);

        sendResponse(res, STATUS_CODE.OK, 'Goods receipt note', newList);
    } catch (error) {
        sendResponse(res, STATUS_CODE.INTERNAL_SERVER_ERROR, error.message);
    }
};

const getExportNotes = async (req, res) => {
    try {
        const query = `
            SELECT
            oi.*,
            i.name item_name,
            o.id output_id,
            o.booking_id,
            o.date_output
            FROM ${TABLE_NAMES.outputs} o
            INNER JOIN ${TABLE_NAMES.output_info} oi ON o.id = oi.output_id
            INNER JOIN ${TABLE_NAMES.items} i ON oi.item_id = i.id
        `;

        const result = await selectData(query);

        const grouped = {};

        result.forEach((element) => {
            const {
                booking_id,
                date_output,
                output_id,
                item_id,
                count,
                price,
                item_name,
            } = element;
            if (!grouped[output_id]) {
                grouped[output_id] = {
                    id: output_id,
                    booking_id,
                    date_output: utils.convertTimeToGMT7(date_output),
                    total_price: 0,
                    items: [],
                };
            }

            grouped[output_id].items.push({
                item_id,
                count,
                price,
                item_name,
            });

            grouped[output_id].total_price += count * price;
        });

        const newList = Object.values(grouped);

        const newSorted = newList.sort((a, b) => {
            return new Date(b.date_output) - new Date(a.date_output);
        });

        sendResponse(res, STATUS_CODE.OK, 'Goods receipt note', newSorted);
    } catch (error) {
        sendResponse(res, STATUS_CODE.INTERNAL_SERVER_ERROR, error.message);
    }
};

module.exports = {
    importGoods,
    getImportList,
    getExportList,
    getImportNotes,
    getExportNotes,
};
