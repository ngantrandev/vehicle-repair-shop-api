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
const {
    TABLE_NAMES,
    PAYMENT_TYPE,
    PAYMENT_STATUS,
} = require('@/src/configs/constants.config');
const { sendNotificationToTopic } = require('@/src/ultil/firebaseServices');
const {
    createUserNotification,
} = require('@/src/services/notificationService');

const VnpTmnCode = process.env.VNP_TMN_CODE || '';

// create url for payment and init payment record
const createPaymentUrl = async (req, res) => {
    try {
        const { booking_id: bookingId } = req.body;

        if (!bookingId) {
            throw new Error('booking_id is required');
        }

        const getBookingInfoQuery = `
            SELECT
                s.name service_name,
                i.final_price amount,
                i.id invoice_id

            FROM ${TABLE_NAMES.bookings} b
            INNER JOIN ${TABLE_NAMES.services} s ON s.id = b.service_id
            INNER JOIN ${TABLE_NAMES.invoices} i ON i.booking_id = b.id
            WHERE b.id = ?
        `;

        const bookingInfo = await selectData(getBookingInfoQuery, [bookingId]);

        const { service_name, amount, invoice_id: invoiceId } = bookingInfo[0];

        const date = new Date();

        // create new date after 2 minus
        const expireTime = new Date(date.getTime() + 20 * 60 * 1000); // Cộng thêm 2 phút

        const timeFormat = 'YYYYMMDDHHmmss';

        const createDate = convertTimeFormat(date, null, timeFormat);
        const expireDate = convertTimeFormat(expireTime, null, timeFormat);
        const txnRef = `GIAODICH_${invoiceId}_${convertTimeFormat(date, null, timeFormat)}`;

        const createPaymentQuery = `
            INSERT INTO
                ${TABLE_NAMES.payments} (invoice_id, created_at, txn_ref, status)
            VALUES (?, ?, ?, ?)
        `;

        await excuteQuery(createPaymentQuery, [
            invoiceId,
            date,
            txnRef,
            PAYMENT_STATUS.pending,
        ]);

        const orderInfo = `Thanh toán dịch vụ ${service_name} và các sản phẩm đặt cùng`;

        const returnUrl = createReturnUrl({
            amount: amount,
            orderInfo,
            txnRef,
            createDate,
            expireDate,
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

const getVNPayReturn = async (req, res) => {
    try {
        // CHECK SUM
        let queryParams = req.query;

        if (Object.keys(queryParams).length === 0) {
            throw new Error('query params is required');
        }

        const vnp_SecureHash = queryParams['vnp_SecureHash'];

        delete queryParams['vnp_SecureHash'];
        delete queryParams['vnp_SecureHashType'];

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

const getVNPayIPN = async (req, res) => {
    try {
        // CHECK SUM
        let queryParams = req.query;

        if (Object.keys(queryParams).length === 0) {
            throw new Error('query params is required');
        }

        const vnp_SecureHash = queryParams['vnp_SecureHash'];
        const vnp_TxnRef = queryParams['vnp_TxnRef'];
        const vnp_Amount = queryParams['vnp_Amount'];
        const invoiceId = vnp_TxnRef.split('_')[1];
        const vnp_resCode = queryParams['vnp_ResponseCode'];

        delete queryParams['vnp_SecureHash'];
        delete queryParams['vnp_SecureHashType'];

        queryParams = sortObject(queryParams);

        const searchParams = buildQueryParams(queryParams);
        const signData = searchParams.toString();

        const secureHash = getChecksum(signData);

        // CHECK 1
        if (secureHash !== vnp_SecureHash) {
            res.status(200).json({
                RspCode: '97',
                Message: 'Invalid Signature',
            });
            return;
        }

        const findInvoiceQuery = `
            SELECT
                p.status,
                i.final_price amount,
                p.txn_ref p_txn_ref,
                b.user_id

            FROM ${TABLE_NAMES.invoices} i
            INNER JOIN ${TABLE_NAMES.payments} p ON i.id = p.invoice_id
            INNER JOIN ${TABLE_NAMES.bookings} b ON i.booking_id = b.id
            INNER JOIN ${TABLE_NAMES.services} s ON s.id = b.service_id

            WHERE p.invoice_id = ?
        `;

        const invoice = await selectData(findInvoiceQuery, [invoiceId]);

        const { status, amount, p_txn_ref, user_id: userId } = invoice[0];

        // CHECK 2
        if (p_txn_ref !== vnp_TxnRef) {
            res.status(200).json({
                RspCode: '01',
                Message: 'booking payment order not found',
            });
            return;
        }

        // CHECK 3
        // VNPay return amount * 100
        if (amount != vnp_Amount / 100) {
            res.status(200).json({
                RspCode: '04',
                Message: 'Amount invalid',
            });
            return;
        }

        // CHECK 4
        //kiểm tra tình trạng giao dịch trước khi cập nhật tình trạng thanh toán
        switch (status) {
            case PAYMENT_STATUS.pending:
                if (vnp_resCode == '00') {
                    // Ở đây cập nhật trạng thái giao dịch thanh toán thành công vào CSDL của bạn
                    await excuteQuery(
                        `
                            UPDATE ${TABLE_NAMES.payments}
                            SET
                                payment_method = ?,
                                amount_paid = ?,
                                order_info = ?,
                                bank_code = ?,
                                bank_transaction_id = ?,
                                transaction_id = ?,
                                payment_status = ?,
                                status = ?
                            WHERE invoice_id = ? AND txn_ref = ?
                        `,
                        [
                            PAYMENT_TYPE.vnpay,
                            amount,
                            queryParams['vnp_OrderInfo'],
                            queryParams['vnp_BankCode'],
                            queryParams['vnp_BankTranNo'],
                            queryParams['vnp_TransactionNo'],
                            queryParams['vnp_TransactionStatus'],
                            PAYMENT_STATUS.success,
                            invoiceId,
                            vnp_TxnRef,
                        ]
                    );

                    const title = 'Thanh toán thành công';
                    const message =
                        queryParams['vnp_OrderInfo'] +
                        ' thành công với số tiền ' +
                        amount +
                        ' VNĐ';

                    await createUserNotification(userId, title, message);

                    await sendNotificationToTopic(
                        title,
                        message,
                        `customer_${userId}`
                    );

                    res.status(200).json({
                        RspCode: '00',
                        Message: 'Success',
                    });
                } else {
                    // Ở đây cập nhật trạng thái giao dịch thanh toán thất bại vào CSDL của bạn

                    await excuteQuery(
                        `UPDATE ${TABLE_NAMES.payments} SET status = ? WHERE invoice_id = ? AND txn_ref = ?`,
                        [PAYMENT_STATUS.fail, invoiceId, vnp_TxnRef]
                    );
                    res.status(200).json({
                        RspCode: '00',
                        Message: 'payment failed, confirm status success',
                    });
                }

                break;

            default:
                res.status(200).json({
                    RspCode: '02',
                    Message:
                        'This order has been updated to the payment status',
                });
                return;
        }
    } catch (error) {
        throw new Error(error);
    }
};

const paymentsController = {
    createPaymentUrl,
    getVNPayReturn,
    getVNPayIPN,
};

module.exports = paymentsController;
