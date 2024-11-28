var fs = require('fs');

const { sendResponse, selectData } = require('../ultil/ultil.lib');
const { STATUS_CODE } = require('../configs/status.codes.config');

const getAllInvoices = async (req, res) => {
    console.log(req.body);
    var files = fs.readdirSync('./invoices');

    // for (var i = 0; i < files.length; i++) {
    //     console.log(files[i]);
    // }

    sendResponse(res, STATUS_CODE.OK, files);
};

const createInvoice = async (req, res) => {
    try {
        const requiredFields = ['booking_id'];

        for (const field of requiredFields) {
            if (!req.body[field]) {
                sendResponse(
                    res,
                    STATUS_CODE.BAD_REQUEST,
                    `${field} is required`
                );

                return;
            }
        }

        const { booking_id } = req.body;

        const bookings = await selectData(
            `SELECT * FROM bookings WHERE id = ?`,
            [booking_id]
        );

        /**
         * SELECT
	b.*,
    items.name item_name,
    items.id as item_id,
    items.price as item_price,
    COUNT(items.id) soluongitem
FROM bookings b
INNER JOIN bookings_items bi ON bi.booking_id = b.id
INNER JOIN items ON items.id = bi.item_id
WHERE b.id = 79
GROUP BY (items.id)
         */

        console.log(bookings);

        const query = `INSERT INTO invoices (booking_id, invoice_date, total_price, final_price, status) VALUES (?, ?, ?, ?, ?)`;

        console.log(query);

        sendResponse(res, STATUS_CODE.OK, 'Create invoice');
    } catch (error) {
        console.error(error);
        sendResponse(res, STATUS_CODE.INTERNAL_SERVER_ERROR, error);
    }
};

module.exports = {
    getAllInvoices,
    createInvoice,
};
