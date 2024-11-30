const {
    sendResponse,
    excuteQuery,
    selectData,
    sortObject,
    buildQueryParams,
    getChecksum,
    convertTimeFormat,
} = require('@/src/ultil/ultil.lib');

const { createReturnUrl } = require('@/src/services/vnpay.service');
const { STATUS_CODE } = require('@/src/configs/status.codes.config');
const { TABLE_NAMES, PAYMENT_TYPE } = require('@/src/configs/constants.config');
const { sendNotificationToTopic } = require('@/src/ultil/firebaseServices');
const {
    createUserNotification,
} = require('@/src/services/notificationService');

const VnpTmnCode = process.env.VNP_TMN_CODE || '';

const prePayment = async (req, res) => {
    try {
        const { booking_id: bookingId } = req.body;

        if (!bookingId) {
            throw new Error('booking_id is required');
        }

        const getBookingInfoQuery = `
            SELECT
                IFNULL(SUM(items.price), 0) items_amount,
                s.price service_amount,
                s.name service_name
                
            FROM ${TABLE_NAMES.bookings} b
            LEFT JOIN ${TABLE_NAMES.bookings_items} bi ON b.id = bi.booking_id
            LEFT JOIN ${TABLE_NAMES.items} ON items.id = bi.item_id
            INNER JOIN ${TABLE_NAMES.services} s ON s.id = b.service_id
            WHERE b.id = ?
       `;

        const bookingInfo = await selectData(getBookingInfoQuery, [bookingId]);

        const { service_amount, service_name, items_amount } = bookingInfo[0];

        const amount = items_amount + service_amount;

        const date = new Date();

        const insertRes = await excuteQuery(
            `INSERT INTO ${TABLE_NAMES.invoices} (booking_id, total_price, final_price, invoice_date) VALUES (?, ?, ?, ?)`,
            [bookingId, amount, amount, date]
        );

        const invoiceId = insertRes.insertId;

        const returnUrl = createReturnUrl({
            amount: amount,
            service_name,
            invoice_id: invoiceId,
            date,
        });

        sendResponse(res, STATUS_CODE.OK, 'Success', {
            payment_url: returnUrl,
            tmn_code: VnpTmnCode,
        });
    } catch (error) {
        console.log(error);
        sendResponse(
            res,
            STATUS_CODE.INTERNAL_SERVER_ERROR,
            'something went wrongs!' + error
        );
    }
};

// create payment for booking
const completePayment = async (req, res) => {
    try {
        const { booking_id: bookingId } = req.body;

        if (!bookingId) {
            throw new Error('booking_id is required');
        }

        const getBookingInfoQuery = `
            SELECT
                IFNULL(SUM(items.price), 0) items_amount,
                s.price service_amount,
                s.name service_name
                
            FROM ${TABLE_NAMES.bookings} b
            LEFT JOIN ${TABLE_NAMES.bookings_items} bi ON b.id = bi.booking_id
            LEFT JOIN ${TABLE_NAMES.items} ON items.id = bi.item_id
            INNER JOIN ${TABLE_NAMES.services} s ON s.id = b.service_id
            WHERE b.id = ?
       `;

        const bookingInfo = await selectData(getBookingInfoQuery, [bookingId]);

        const { service_amount, service_name, items_amount } = bookingInfo[0];

        const amount = items_amount + service_amount;

        const date = new Date();

        const insertRes = await excuteQuery(
            `INSERT INTO ${TABLE_NAMES.invoices} (booking_id, total_price, final_price, invoice_date) VALUES (?, ?, ?, ?)`,
            [bookingId, amount, amount, date]
        );

        const invoiceId = insertRes.insertId;

        const returnUrl = createReturnUrl({
            amount: amount,
            service_name,
            invoice_id: invoiceId,
            date,
        });

        sendResponse(res, STATUS_CODE.OK, 'Success', {
            payment_url: returnUrl,
            tmn_code: VnpTmnCode,
        });
    } catch (error) {
        console.log(error);
        sendResponse(
            res,
            STATUS_CODE.INTERNAL_SERVER_ERROR,
            'something went wrongs!' + error
        );
    }
};

const getReturnInfo = async (req, res) => {
    try {
        // CHECK SUM
        let queryParams = req.query;

        if (Object.keys(queryParams).length === 0) {
            throw new Error('query params is required');
        }

        const vnp_SecureHash = queryParams['vnp_SecureHash'];
        const invoiceId = queryParams['vnp_TxnRef'].split('_')[1];

        delete queryParams['vnp_SecureHash'];
        delete queryParams['vnp_SecureHashType'];
        delete queryParams['booking_id'];

        queryParams = sortObject(queryParams);

        const searchParams = buildQueryParams(queryParams);
        const signData = searchParams.toString();

        const secureHash = getChecksum(signData);

        if (secureHash !== vnp_SecureHash) {
            throw new Error("checksum don't match");
        }

        if (queryParams['vnp_ResponseCode'] !== '00') {
            throw new Error('payment failed');
        }

        // UPDATE payment status
        const paymentQuery = `
            INSERT INTO ${TABLE_NAMES.payments}
            (invoice_id, payment_date, payment_method, amount_paid, order_info, bank_code, bank_transaction_id, transaction_id, txn_ref, payment_status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        `;

        const paymentDate = convertTimeFormat(
            queryParams['vnp_PayDate'],
            'YYYYMMDDHHmmss',
            'YYYY-MM-DD HH:mm:ss'
        );

        const paymentAmount = queryParams['vnp_Amount'] / 100;
        const data = [
            invoiceId,
            paymentDate,
            PAYMENT_TYPE.vnpay,
            paymentAmount,
            queryParams['vnp_OrderInfo'],
            queryParams['vnp_BankCode'],
            queryParams['vnp_BankTranNo'],
            queryParams['vnp_TransactionNo'],
            queryParams['vnp_TxnRef'],
            queryParams['vnp_TransactionStatus'],
        ];

        await excuteQuery(paymentQuery, data);

        const bookingInfo = await selectData(
            `
                SELECT
                    s.name service_name,
                    b.user_id
                FROM ${TABLE_NAMES.invoices} i
                INNER JOIN ${TABLE_NAMES.bookings} b ON i.booking_id = b.id
                INNER JOIN ${TABLE_NAMES.services} s ON s.id = b.service_id
                WHERE i.id = ?
            `,
            [invoiceId]
        );

        const userId = bookingInfo[0].user_id;
        const serviceName = bookingInfo[0].service_name;
        const title = 'Thanh toán thành công';
        const message = `Thanh toán thành công dịch vụ ${serviceName} số tiền ${paymentAmount} VNĐ`;

        await createUserNotification(userId, title, message);

        await sendNotificationToTopic(title, message, `customer_${userId}`);

        sendResponse(res, STATUS_CODE.OK, 'create payment success');
    } catch (error) {
        console.log(error.message);
        sendResponse(
            res,
            STATUS_CODE.INTERNAL_SERVER_ERROR,
            'something went wrongs!' + error
        );
    }
};

const paymentsController = {
    prePayment,
    getReturnInfo,
    completePayment,
};

module.exports = paymentsController;
