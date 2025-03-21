import { CustomRequest } from '@/src/types/requests';
import { Response } from 'express';

import {
    sendResponse,
    excuteQuery,
    selectData,
    sortObject,
    buildQueryParams,
    getChecksum,
    convertTimeFormat,
    executeTransaction,
} from '@/src/ultil/ultil.lib';

import { createReturnUrl } from '@/src/services/vnpay.service';
import { STATUS_CODE } from '@/src/configs/status.codes.config';
import {
    TABLE_NAMES,
    PAYMENT_TYPE,
    PAYMENT_STATUS,
} from '@/src/configs/constants.config';
import { sendNotificationToTopic } from '@/src/services/firebase.service';
import { createUserNotification } from '@/src/services/notification.service';
import { BookingResponse, InvoiceResponse } from '@/src/types/responses';
import { Invoice } from '@/src/types/models';

const VnpTmnCode = process.env.VNP_TMN_CODE || '';

// create url for payment and init payment record
export const createPaymentUrl = async (req: CustomRequest, res: Response) => {
    try {
        const { booking_id: bookingId } = req.body;

        if (!bookingId) {
            throw new Error('booking_id is required');
        }

        const bookingsData: BookingResponse[] = (await selectData(
            `
            SELECT
                b.id booking_id,
                b.created_at,
                s.price service_price,
                s.name service_name,
                IFNULL(SUM(bi.price * bi.count), 0) as items_price
            FROM bookings b
            INNER JOIN services s ON s.id = b.service_id
            LEFT JOIN bookings_items bi ON bi.booking_id = b.id 
            LEFT JOIN items i ON i.id = bi.item_id
            WHERE b.id = ?
            GROUP BY s.id, b.id
            
            `,
            [bookingId]
        )) as BookingResponse[];

        const {
            service_name,
            service_price = 0,
            items_price,
        } = bookingsData[0];

        const totalPrice = service_price + (items_price || 0);

        const checkInvoiceExists: InvoiceResponse[] = (await selectData(
            `SELECT * FROM ${TABLE_NAMES.invoices} WHERE booking_id = ?`,
            [bookingId]
        )) as InvoiceResponse[];

        if (checkInvoiceExists.length > 0) {
            // update invoice
            await excuteQuery(
                `UPDATE ${TABLE_NAMES.invoices} SET total_price = ?, final_price = ? WHERE booking_id = ?`,
                [totalPrice, totalPrice, bookingId]
            );
        } else {
            await excuteQuery(
                `
                    INSERT INTO ${TABLE_NAMES.invoices} (booking_id, total_price, final_price, invoice_date) 
                    SELECT ?, ?, ?, ?
                    WHERE NOT EXISTS (
                        SELECT 1
                        FROM ${TABLE_NAMES.invoices}
                        WHERE booking_id = ?
                    );
                `,
                [
                    bookingId,
                    totalPrice,
                    totalPrice,
                    bookingsData[0].created_at,
                    bookingId,
                ]
            );
        }

        const getBookingInfoQuery = `
            SELECT
                i.id invoice_id,
                IFNULL(SUM(p.amount_paid), 0) as amount_paid

            FROM ${TABLE_NAMES.bookings} b
            INNER JOIN ${TABLE_NAMES.invoices} i ON i.booking_id = b.id
            LEFT JOIN ${TABLE_NAMES.payments} p ON p.invoice_id = i.id AND p.status = '${PAYMENT_STATUS.success}'
            WHERE b.id = ?
        `;

        const bookingInfo: any[] = (await selectData(getBookingInfoQuery, [
            bookingId,
        ])) as any[];

        const { invoice_id: invoiceId, amount_paid: amountPaid } =
            bookingInfo[0];

        const date = new Date();

        // create new date after 2 minus
        const expireTime = new Date(date.getTime() + 20 * 60 * 1000); // Cộng thêm 2 phút

        const timeFormat = 'YYYYMMDDHHmmss';

        const createDate = convertTimeFormat(date, null, timeFormat);
        const expireDate = convertTimeFormat(expireTime, null, timeFormat);
        const txnRef = `GIAODICH_${invoiceId}_${convertTimeFormat(date, null, timeFormat)}`;

        // const paymentExists = await selectData(
        //     'SELECT * FROM payments WHERE invoice_id = ?',
        //     invoiceId
        // );

        // if (paymentExists.length == 0) {
        const unPaidAmount = totalPrice - amountPaid;
        const createPaymentQuery = `
                INSERT INTO
                    ${TABLE_NAMES.payments} (invoice_id, created_at, txn_ref, status, amount_paid)
                SELECT ?, ?, ?, ?, ?
            `;

        await excuteQuery(createPaymentQuery, [
            invoiceId,
            date,
            txnRef,
            PAYMENT_STATUS.pending,
            unPaidAmount,
        ]);
        // } else {
        //     txnRef = paymentExists[0].txn_ref;
        // }

        const orderInfo = `Thanh toán dịch vụ ${service_name} và các sản phẩm đặt cùng`;

        const returnUrl = createReturnUrl({
            amount: unPaidAmount,
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

export const getVNPayReturn = async (req: CustomRequest, res: Response) => {
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
    } catch (error: any) {
        sendResponse(
            res,
            STATUS_CODE.INTERNAL_SERVER_ERROR,
            'something went wrongs!' + error
        );
    }
};

export const getVNPayIPN = async (req: CustomRequest, res: Response) => {
    try {
        // CHECK SUM
        let queryParams = req.query;

        if (Object.keys(queryParams).length === 0) {
            throw new Error('query params is required');
        }

        const vnp_SecureHash = queryParams['vnp_SecureHash'];
        const vnp_TxnRef: string = queryParams['vnp_TxnRef'] as string;
        const vnp_Amount: number = Number(queryParams['vnp_Amount']);
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
                b.user_id,
                b.id booking_id,
                p.amount_paid

            FROM ${TABLE_NAMES.invoices} i
            LEFT JOIN ${TABLE_NAMES.payments} p ON i.id = p.invoice_id
            INNER JOIN ${TABLE_NAMES.bookings} b ON i.booking_id = b.id
            INNER JOIN ${TABLE_NAMES.services} s ON s.id = b.service_id

            WHERE p.invoice_id = ?
            ORDER BY p.created_at DESC
        `;

        const invoices: InvoiceResponse[] = (await selectData(
            findInvoiceQuery,
            [invoiceId]
        )) as InvoiceResponse[];

        let invoice = null;
        invoices.forEach((item) => {
            const { p_txn_ref } = item;
            if (p_txn_ref === vnp_TxnRef) {
                invoice = item;
                return;
            }
        });

        // CHECK 2
        if (!invoice) {
            res.status(200).json({
                RspCode: '01',
                Message: 'booking payment order not found',
            });
            return;
        }

        const {
            amount_paid: amountPaid,
            status,
            user_id: userId,
            booking_id: bookingId,
        } = invoice;

        // CHECK 3
        // VNPay return amount * 100
        if (amountPaid != vnp_Amount / 100) {
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

                    const selectOutputQuery = `
                    SELECT
                        op.id output_id
                    FROM ${TABLE_NAMES.outputs} op
                    INNER JOIN ${TABLE_NAMES.bookings} b ON b.id = op.booking_id
                    INNER JOIN ${TABLE_NAMES.invoices} ivn ON ivn.booking_id = b.id
                    WHERE ivn.id = ?
                    `;

                    const outputs: any[] = (await selectData(
                        selectOutputQuery,
                        [invoiceId]
                    )) as any[];

                    const queries = [];
                    const args = [];

                    queries.push(
                        `
                        UPDATE ${TABLE_NAMES.payments}
                        SET
                            payment_method = ?,
                            order_info = ?,
                            bank_code = ?,
                            bank_transaction_id = ?,
                            transaction_id = ?,
                            payment_status = ?,
                            status = ?
                        WHERE invoice_id = ? AND txn_ref = ?
                        `
                    );

                    args.push([
                        PAYMENT_TYPE.vnpay,
                        queryParams['vnp_OrderInfo'],
                        queryParams['vnp_BankCode'],
                        queryParams['vnp_BankTranNo'],
                        queryParams['vnp_TransactionNo'],
                        queryParams['vnp_TransactionStatus'],
                        PAYMENT_STATUS.success,
                        invoiceId,
                        vnp_TxnRef,
                    ]);

                    // Nếu đã có output thì cập nhật thông tin output
                    if (outputs.length > 0) {
                        const outputId = outputs[0].output_id;

                        queries.push(
                            `DELETE FROM ${TABLE_NAMES.output_info} WHERE output_id = ?`
                        );
                        args.push([outputId]);

                        queries.push(
                            `
                            INSERT INTO ${TABLE_NAMES.output_info} (output_id, item_id, count, price)
                            SELECT
                                ?,
                                bi.item_id,
                                bi.count,
                                bi.price
                            FROM ${TABLE_NAMES.bookings_items} bi
                            WHERE bi.booking_id = ? 
                            `
                        );

                        args.push([outputId, bookingId]);
                    } else {
                        queries.push(
                            `INSERT INTO ${TABLE_NAMES.outputs} (date_output, booking_id) VALUES (?, ?)`
                        );
                        args.push([new Date(), bookingId]);

                        queries.push('SET @output_id = LAST_INSERT_ID()');
                        args.push([]);

                        queries.push(`
                            INSERT INTO ${TABLE_NAMES.output_info} (output_id, item_id, count, price)
                            SELECT 
                                @output_id,
                                bi.item_id,
                                bi.count,
                                bi.price
                            FROM payments p 
                            INNER JOIN invoices ivn ON ivn.id = p.invoice_id
                            INNER JOIN bookings b ON b.id = ivn.booking_id
                            INNER JOIN bookings_items bi ON bi.booking_id = b.id
                            WHERE p.status = 'success' AND ivn.id = ?    
                        `);

                        args.push([invoiceId]);
                    }

                    await executeTransaction(queries, args);

                    const title = 'Thanh toán thành công';
                    const message =
                        queryParams['vnp_OrderInfo'] +
                        ' thành công với số tiền ' +
                        amountPaid +
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
    } catch (error: any) {
        throw new Error(error);
    }
};
