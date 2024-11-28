const path = require('path');
const sharp = require('sharp');

const {
    sendResponse,
    isValidInteger,
    isValidDouble,
    getCurrentTimeInGMT7,
    executeTransaction,
    excuteQuery,
    selectData,
    sortObject,
    buildQueryParams,
    getChecksum,
    convertTimeFormat,
} = require('@/src/ultil/ultil.lib');

const { createReturnUrl } = require('@/src/services/vnpay.service');
const { STATUS_CODE } = require('@/src/configs/status.codes.config');
const {
    TABLE_NAMES,
    BOOKING_STATE,
    PAYMENT_TYPE,
} = require('@/src/configs/constants.config');
const { sendNotificationToTopic } = require('@/src/ultil/firebaseServices');

const VnpTmnCode = process.env.VNP_TMN_CODE || '';

const createPayment = async (req, res) => {
    try {
        const bodyData = req.body;

        const {
            items,
            service_id,
            latitude,
            longitude,
            address_name,
            full_address,
            place_id,
            note,
        } = bodyData;

        /**VALIDATE VALUE */
        if (!service_id) {
            sendResponse(
                res,
                STATUS_CODE.BAD_REQUEST,
                `service_id is required`
            );
            return;
        }

        /** VALIDATE VALUE TYPE */
        if (!isValidInteger(service_id)) {
            sendResponse(
                res,
                STATUS_CODE.BAD_REQUEST,
                `service_id must be integer`
            );
            return;
        }

        if (latitude && !isValidDouble(latitude)) {
            sendResponse(
                res,
                STATUS_CODE.BAD_REQUEST,
                `latitude must be double`
            );
            return;
        }
        if (longitude && !isValidDouble(longitude)) {
            sendResponse(
                res,
                STATUS_CODE.BAD_REQUEST,
                `longitude must be double`
            );
            return;
        }
        if (!address_name) {
            sendResponse(
                res,
                STATUS_CODE.BAD_REQUEST,
                `address_name is required`
            );
            return;
        }
        if (!full_address) {
            sendResponse(
                res,
                STATUS_CODE.BAD_REQUEST,
                `full_address is required`
            );
            return;
        }
        if (!place_id) {
            sendResponse(res, STATUS_CODE.BAD_REQUEST, `place_id is required`);
            return;
        }

        let fileName = '';
        let relativePath = ''; /** path from root dir to image */

        if (req.file) {
            const buffer = req.file.buffer;
            fileName = Date.now() + '.webp';
            relativePath = path.join('./uploads', fileName);

            try {
                await sharp(buffer).webp({ quality: 20 }).toFile(relativePath);
            } catch (error) {
                sendResponse(
                    res,
                    STATUS_CODE.INTERNAL_SERVER_ERROR,
                    'cannot create booking at this time' + error
                );
                return;
            }
        }

        const queries = [
            `INSERT INTO ${TABLE_NAMES.addresses} (latitude, longitude, place_id, address_name, full_address) VALUES (?, ?, ?, ?, ?);`,
            'SET @address_id = LAST_INSERT_ID();',
            `INSERT INTO ${TABLE_NAMES.bookings} (service_id, note, user_id, created_at, modified_at, address_id, status, image_url) VALUES (?, ?, ?, ?, ?, @address_id, ?, ?);`,
        ];
        const createdTime = getCurrentTimeInGMT7();

        const params = [
            [latitude, longitude, place_id, address_name, full_address],
            [],
            [
                service_id,
                note,
                req.tokenPayload.user_id,
                createdTime,
                createdTime,
                BOOKING_STATE.pending,
                relativePath,
            ],
        ];

        const transactionRes = await executeTransaction(queries, params);

        const bookingId = transactionRes[2].insertId;

        if (items && items.length > 0) {
            const args = [];
            const addItemToBookingQuery = `
                INSERT INTO ${TABLE_NAMES.bookings_items} (item_id, booking_id) VALUES
                ${items
                    .map((item) => {
                        args.push(item);
                        args.push(bookingId);
                        return '(?, ?)';
                    })
                    .join(', ')}
            `;

            await excuteQuery(addItemToBookingQuery, args);
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

        const { service_amount, service_name } = bookingInfo[0];

        const amount = service_amount + service_amount;

        const returnUrl = createReturnUrl({
            amount: amount,
            service_name,
            booking_id: bookingId,
        });

        sendResponse(res, STATUS_CODE.OK, 'Success', {
            payment_url: returnUrl,
            tmn_code: VnpTmnCode,
        });
    } catch (error) {
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

        const vnp_SecureHash = queryParams['vnp_SecureHash'];

        delete queryParams['vnp_SecureHash'];
        delete queryParams['vnp_SecureHashType'];
        delete queryParams['booking_id'];

        queryParams = sortObject(queryParams);

        const searchParams = buildQueryParams(queryParams);
        const signData = searchParams.toString();

        const secureHash = getChecksum(signData);

        if (secureHash !== vnp_SecureHash) {
            sendResponse(res, STATUS_CODE.BAD_REQUEST, 'Invalid checksum');
            return;
        }

        if (queryParams['vnp_ResponseCode'] !== '00') {
            sendResponse(res, STATUS_CODE.BAD_REQUEST, 'Payment failed');
            return;
        }

        // UPDATE payment status
        const paymentQuery = `
            INSERT INTO ${TABLE_NAMES.payments}
            (booking_id, payment_date, payment_method, amount_paid, order_info, bank_code, bank_transaction_id, transaction_id, txn_ref, payment_status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        `;

        const paymentDate = convertTimeFormat(
            queryParams['vnp_PayDate'],
            'YYYYMMDDHHmmss',
            'YYYY-MM-DD HH:mm:ss'
        );

        const bookingId = queryParams['vnp_TxnRef'].split('_')[1];
        const paymentAmount = queryParams['vnp_Amount'] / 100;
        const data = [
            bookingId,
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
                FROM ${TABLE_NAMES.bookings} b
                INNER JOIN ${TABLE_NAMES.services} s ON s.id = b.service_id
                WHERE b.id = ?
            `,
            [bookingId]
        );

        const title = 'Thanh toán thành công';
        const message = `Thanh toán thành công dịch vụ ${bookingInfo[0].service_name} số tiền ${paymentAmount} VNĐ`;
        const userId = bookingInfo[0].user_id;
        sendNotificationToTopic(title, message, `customer_${userId}`);

        sendResponse(res, STATUS_CODE.OK, 'create payment success');
    } catch (error) {
        sendResponse(
            res,
            STATUS_CODE.INTERNAL_SERVER_ERROR,
            'something went wrongs!' + error
        );
    }
};

const paymentsController = {
    createPayment,
    getReturnInfo,
};

module.exports = paymentsController;
