const { TABLE_NAMES } = require('../configs/constants.config');
const { STATUS_CODE } = require('../configs/status.codes.config');
const {
    isValidDate,
    sendResponse,
    selectData,
    convertDateToGMT7,
} = require('../ultil/ultil.lib');

const getRevenue = async (req, res) => {
    try {
        const {
            start_date: startDate,
            end_date: endDate,
            mode = 'month',
        } = req.query;

        const today = new Date();
        let start, end;

        if (!startDate && !endDate) {
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
            start = new Date(startDate);
            end = new Date(endDate);
        }

        let dates = [];

        if (mode === 'day') {
            let currentDate = new Date(start);
            while (currentDate <= end) {
                dates.push(formatDate(currentDate));
                currentDate.setDate(currentDate.getDate() + 1);
            }
        } else if (mode === 'month') {
            let currentDate = new Date(start);
            while (currentDate <= end) {
                dates.push(formatMonth(currentDate));
                currentDate.setMonth(currentDate.getMonth() + 1);
            }
        } else if (mode === 'year') {
            let currentDate = new Date(start);
            while (currentDate <= end) {
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
            groupClause = 'DATE_FORMAT(bookings.created_at, "%d-%m-%Y")';
        } else if (mode === 'month') {
            groupClause = 'DATE_FORMAT(bookings.created_at, "%m-%Y")';
        } else if (mode === 'year') {
            groupClause = 'DATE_FORMAT(bookings.created_at, "%Y")';
        }

        const query = `
            SELECT ${groupClause} AS date, SUM(services.price) AS revenue
            FROM ${TABLE_NAMES.bookings}
            JOIN services ON ${TABLE_NAMES.bookings}.service_id = services.id
            WHERE DATE(${TABLE_NAMES.bookings}.created_at) BETWEEN ? AND ?
            GROUP BY ${groupClause}
            ORDER BY ${groupClause};
        `;

        const data = await selectData(query, [start, end]);

        const revenueData = data.reduce((acc, item) => {
            acc[item.date] = item.revenue;
            return acc;
        }, {});

        const result = dates.map((date) => ({
            date,
            revenue: revenueData[date] || 0,
        }));

        sendResponse(res, STATUS_CODE.OK, 'Revenue', result);
    } catch (error) {
        console.log(error);
        sendResponse(res, STATUS_CODE.INTERNAL_SERVER_ERROR, error.message);
    }
};

const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};

const formatMonth = (date) => {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}-${year}`;
};

const formatYear = (date) => date.getFullYear();

const statisticsController = {
    getRevenue,
};

module.exports = statisticsController;
