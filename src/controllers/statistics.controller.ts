import { CustomRequest } from '@/src/types/requests';
import { Response } from 'express';

import { TABLE_NAMES, PAYMENT_STATUS } from '@/src/configs/constants.config';
import { STATUS_CODE } from '@/src/configs/status.codes.config';
import { sendResponse, selectData } from '@/src/ultil/ultil.lib';

export const getRevenue = async (req: CustomRequest, res: Response) => {
    try {
        const {
            start_date: startDate,
            end_date: endDate,
            mode = 'month',
        } = req.query;

        const today = new Date();
        let start, end;

        if (!startDate || !endDate) {
            if (mode === 'day') {
                start = new Date(today.getFullYear(), today.getMonth(), 1);
                end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
            } else if (mode === 'month') {
                start = new Date(today.getFullYear(), 0, 1);
                end = new Date(today.getFullYear(), 11, 31);
            } else if (mode === 'year') {
                start = new Date(today.getFullYear() - 9, 0, 1);
                end = new Date(today.getFullYear(), 11, 31);
            }
        } else {
            start = new Date(startDate as string);
            end = new Date(endDate as string);
        }

        let dates = [];

        let currentDate = start ? new Date(start) : new Date();
        if (mode === 'day') {
            while (end && currentDate <= end) {
                dates.push(formatDate(currentDate));
                currentDate.setDate(currentDate.getDate() + 1);
            }
        } else if (mode === 'month') {
            while (end && currentDate <= end) {
                dates.push(formatMonth(currentDate));
                currentDate.setMonth(currentDate.getMonth() + 1);
            }
        } else if (mode === 'year') {
            while (end && currentDate <= end) {
                dates.push(formatYear(currentDate));
                currentDate.setFullYear(currentDate.getFullYear() + 1);
            }
        } else {
            return sendResponse(
                res,
                STATUS_CODE.BAD_REQUEST,
                'Invalid mode. Use "day", "month", or "year".'
            );
        }

        let groupClause = '';
        if (mode === 'day') {
            groupClause = 'DATE_FORMAT(b.created_at, "%d-%m-%Y")';
        } else if (mode === 'month') {
            groupClause = 'DATE_FORMAT(b.created_at, "%m-%Y")';
        } else if (mode === 'year') {
            groupClause = 'DATE_FORMAT(b.created_at, "%Y")';
        }

        const query = `
            SELECT 
                ${groupClause} AS date,
                b.id AS booking_id,
                b.created_at,
                p.amount_paid AS total_price
                
            FROM 
                ${TABLE_NAMES.payments} p
            INNER JOIN ${TABLE_NAMES.invoices} i ON p.invoice_id = i.id
            INNER JOIN ${TABLE_NAMES.bookings} b ON b.id = i.booking_id
            WHERE p.status = '${PAYMENT_STATUS.success}'
            GROUP BY b.id, ${groupClause}

        `;

        const data: any[] = (await selectData(query, [start, end])) as any[];

        const revenueData = data.reduce((acc, item) => {
            const { date, total_price } = item;

            acc[date] = (acc[date] || 0) + total_price;
            return acc;
        }, {});

        const result = dates.map((date) => ({
            date,
            revenue: revenueData[date] || 0,
        }));

        sendResponse(res, STATUS_CODE.OK, 'Revenue', result);
    } catch (error: any) {
        sendResponse(res, STATUS_CODE.INTERNAL_SERVER_ERROR, error.message);
    }
};

export const topItems = async (req: CustomRequest, res: Response) => {
    try {
        // mode = previous_month, current_month, previous_year, current_year
        const { mode } = req.query;

        const wheres = [];
        const args = [];

        if (mode == 'previous_month') {
            // get start of month and end of month
            const today = new Date();
            const start = new Date(
                today.getFullYear(),
                today.getMonth() - 1,
                1
            );
            const end = new Date(today.getFullYear(), today.getMonth(), 0);

            wheres.push(`o.date_output BETWEEN ? AND ?`);
            args.push(start, end);
        } else if (mode == 'current_month') {
            // get start of month and end of month
            const today = new Date();
            const start = new Date(today.getFullYear(), today.getMonth(), 1);
            const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
            wheres.push(`o.date_output BETWEEN ? AND ?`);
            args.push(start, end);
        } else if (mode == 'current_year') {
            const today = new Date();
            const start = new Date(today.getFullYear(), 0, 1);
            const end = new Date(today.getFullYear(), 11, 31);
            wheres.push(`o.date_output BETWEEN ? AND ?`);
            args.push(start, end);
        }

        const query = `
            SELECT
                oi.item_id,
                i.name,
                IFNULL(SUM(oi.count), 0) total_output,
                IFNULL(SUM(oi.price * oi.count), 0) total_price

            FROM ${TABLE_NAMES.output_info} oi
            INNER JOIN ${TABLE_NAMES.items} i ON oi.item_id = i.id
            INNER JOIN ${TABLE_NAMES.outputs} o ON oi.output_id = o.id
            ${wheres.length > 0 ? `WHERE ${wheres.join(' AND ')}` : ''}
            GROUP BY oi.item_id
            ORDER BY total_output DESC
            LIMIT 5
        `;

        const data = await selectData(query, args);

        sendResponse(res, STATUS_CODE.OK, 'Top items', data);
    } catch (error: any) {
        sendResponse(res, STATUS_CODE.INTERNAL_SERVER_ERROR, error.message);
    }
};

export const topStaffs = async (req: CustomRequest, res: Response) => {
    try {
        const { mode } = req.query;
        const where = [`b.status = 'done'`];
        const args = [];

        if (mode === 'previous_month') {
            const today = new Date();
            const start = new Date(
                today.getFullYear(),
                today.getMonth() - 1,
                1
            );
            const end = new Date(today.getFullYear(), today.getMonth(), 0);
            where.push(`b.created_at BETWEEN ? AND ?`);
            args.push(start, end);
        } else if (mode === 'current_month') {
            const today = new Date();
            const start = new Date(today.getFullYear(), today.getMonth(), 1);
            const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
            where.push(`b.created_at BETWEEN ? AND ?`);
            args.push(start, end);
        } else if (mode === 'current_year') {
            const today = new Date();
            const start = new Date(today.getFullYear(), 0, 1);
            const end = new Date(today.getFullYear(), 11, 31);
            where.push(`b.created_at BETWEEN ? AND ?`);
            args.push(start, end);
        }

        const query = `
            SELECT
                b.staff_id,
                s.firstname,
                s.lastname,
                COUNT(b.id) AS total_booking,
                IFNULL(SUM(p.amount_paid), 0) total_revenue

            FROM ${TABLE_NAMES.bookings} b
            INNER JOIN ${TABLE_NAMES.staffs} s ON b.staff_id = s.id
            LEFT JOIN invoices i ON b.id = i.booking_id
            LEFT JOIN payments p ON i.id = p.invoice_id
            ${where.length > 0 ? `WHERE ${where.join(' AND ')}` : ''}
            GROUP BY b.staff_id, s.firstname, s.lastname
            ORDER BY total_revenue DESC
            LIMIT 5
        `;

        const data: any[] = (await selectData(query, args)) as any[];

        const newData = data.map(({ firstname, lastname, ...orther }) => {
            return {
                fullname: `${lastname} ${firstname}`,
                ...orther,
            };
        });
        sendResponse(res, STATUS_CODE.OK, 'Top staffs', newData);
    } catch (error: any) {
        sendResponse(res, STATUS_CODE.INTERNAL_SERVER_ERROR, error.message);
    }
};

const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};

const formatMonth = (date: Date) => {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}-${year}`;
};

const formatYear = (date: Date) => date.getFullYear();

const statisticsController = {
    getRevenue,
    topItems,
    topStaffs,
};

module.exports = statisticsController;
