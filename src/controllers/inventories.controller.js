const { STATUS_CODE } = require('@/src/configs/status.codes.config');
const {
    sendResponse,
    selectData,
    executeTransaction,
} = require('@/src/ultil/ultil.lib');
const { TABLE_NAMES } = require('@/src/configs/constants.config');

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

module.exports = {
    importGoods,
    getImportList,
    getExportList,
};
