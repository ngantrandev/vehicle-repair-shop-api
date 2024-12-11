const { TABLE_NAMES, USER_ROLES } = require('@/src/configs/constants.config');
const {
    convertTimeToGMT7,
    executeTransaction,
} = require('@/src/ultil/ultil.lib');

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
            `INSERT INTO ${TABLE_NAMES.notifications_users} (user_id, notification_id,recipient_type , is_read) VALUES (?, @notification_id, '${USER_ROLES.customer}', 0);`,
        ];

        await executeTransaction(queries, [
            [title, message, formattedDate],
            [],
            [userId],
        ]);

        return true;
    } catch (error) {
        console.log('send message error', error);
        return false;
    }
};

const createStaffNotification = async (staffId, title, message) => {
    try {
        if (!staffId || !title || !message) {
            throw new Error('Invalid parameters');
        }

        const date = new Date().toISOString();
        const formattedDate = convertTimeToGMT7(date);
        const queries = [
            `INSERT INTO ${TABLE_NAMES.notifications} (title, message, date) VALUES (?, ?, ?);`,
            'SET @notification_id = LAST_INSERT_ID();',
            `INSERT INTO ${TABLE_NAMES.notifications_users} (user_id, notification_id,recipient_type , is_read) VALUES (?, @notification_id, '${USER_ROLES.staff}', 0);`,
        ];

        await executeTransaction(queries, [
            [title, message, formattedDate],
            [],
            [staffId],
        ]);

        return true;
    } catch (error) {
        console.log('send message error', error);
        return false;
    }
};

module.exports = {
    createUserNotification,
    createStaffNotification,
};
