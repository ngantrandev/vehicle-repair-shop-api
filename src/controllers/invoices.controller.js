var fs = require('fs');

const {
    sendResponse,
    selectData,
    convertDateToGMT7,
    excuteQuery,
} = require('../ultil/ultil.lib');
const { STATUS_CODE } = require('../configs/status.codes.config');
const { TABLE_NAMES } = require('../configs/constants.config');
const { createInvoiceFile } = require('../services/invoice.service');

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

const exportInvoice = async (req, res) => {
    try {
        const { booking_id } = req.body;

        if (!booking_id) {
            sendResponse(
                res,
                STATUS_CODE.BAD_REQUEST,
                'booking_id is required'
            );
            return;
        }

        const selectBookingQuery = `
        SELECT 
            b.*,
            s.name AS service_name,
            s.price AS service_price,
            u.lastname AS user_lastname,
            u.firstname AS user_firstname,
            u.phone AS user_phone,
            addr.full_address,
            addr.address_name
        FROM ${TABLE_NAMES.bookings} AS b
        JOIN ${TABLE_NAMES.services} AS s ON b.service_id = s.id
        JOIN ${TABLE_NAMES.users} AS u ON b.user_id = u.id
        JOIN ${TABLE_NAMES.addresses} AS addr ON b.address_id = addr.id
        WHERE b.id = ?
        
        `;
        const bookings = await selectData(selectBookingQuery, [booking_id]);

        if (bookings.length === 0) {
            sendResponse(res, STATUS_CODE.NOT_FOUND, 'Booking not found');
            return;
        }

        const {
            user_phone,
            user_firstname,
            user_lastname,
            address_name,
            full_address,
            service_name,
            service_price,
        } = bookings[0];

        const items = await selectData(
            `
            SELECT
                i.id AS id,
                i.name AS name,
                i.price AS price,
                COUNT(id) AS quantity
            FROM ${TABLE_NAMES.bookings_items} AS bi
            JOIN ${TABLE_NAMES.items} AS i ON bi.item_id = i.id
            WHERE bi.booking_id = ?
            GROUP BY i.id, i.name, i.price  
        `,
            [booking_id]
        );

        const invoice = {
            booking_id: booking_id,
            full_address: address_name + ', ' + full_address,
            items: items || [],
            service: {
                name: service_name,
                price: service_price,
            },
            user: {
                fullname: user_lastname + ' ' + user_firstname,
                phone: user_phone,
            },
        };

        const invoicePath = `invoice_${booking_id}_${convertDateToGMT7(new Date())}.pdf`;

        await createInvoiceFile(invoice, invoicePath);

        await excuteQuery(
            `UPDATE ${TABLE_NAMES.invoices} SET invoice_file = ? WHERE booking_id = ?`,
            [invoicePath, booking_id]
        );

        sendResponse(res, STATUS_CODE.OK, 'Export invoice successfully');
    } catch (error) {
        sendResponse(res, STATUS_CODE.INTERNAL_SERVER_ERROR, error);
    }
};

module.exports = {
    getAllInvoices,
    createInvoice,
    exportInvoice,
};