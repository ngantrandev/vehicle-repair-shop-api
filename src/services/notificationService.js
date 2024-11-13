const { TABLE_NAMES } = require('../configs/constants.config');
const { convertTimeToGMT7, executeTransaction } = require('../ultil/ultil.lib');

const createUserNotification = async (userId, title, message) => {
    try {
        if (!userId || !title || !message) {
            throw new Error('Invalid parameters');
        }

        const date = new Date().toISOString();
        const formattedDate = convertTimeToGMT7(date);
        const queries = [
            `INSERT INTO ${TABLE_NAMES.notifications} (title, message, date) VALUES (?, ?, ?);`,
            'SET @notification_id = LAST_INSERT_ID();',
            `INSERT INTO ${TABLE_NAMES.user_notifications} (user_id, notification_id, is_read) VALUES (?, @notification_id, 0);`,
        ];

        await executeTransaction(queries, [
            [title, message, formattedDate],
            [],
            [userId],
        ]);

        return true;
    } catch (error) {
        return false;
    }
};

module.exports = {
    createUserNotification,
};
