const { TABLE_NAMES, USER_ROLES } = require('../configs/constants.config');
const { STATUS_CODE } = require('../configs/status.codes.config');
const {
    sendResponse,
    selectData,
    convertTimeToGMT7,
} = require('../ultil/ultil.lib');

const userGetAllNotifications = async (req, res) => {
    try {
        const query = `
            SELECT
                noti.*,
                res.is_read

            FROM (
                SELECT * FROM ${TABLE_NAMES.notifications_users} WHERE user_id = ? AND recipient_type = '${USER_ROLES.customer}'
            ) AS res
            INNER JOIN ${TABLE_NAMES.notifications} AS noti ON noti.id = res.notification_id
            ORDER BY noti.date DESC
           
        
        `;

        const notifications = await selectData(query, [
            req.tokenPayload.user_id,
        ]);

        const newList = notifications.map(({ date, ...other }) => {
            other.date = convertTimeToGMT7(date);

            return other;
        });

        sendResponse(res, STATUS_CODE.OK, 'success', newList);
    } catch (error) {
        sendResponse(
            res,
            STATUS_CODE.INTERNAL_SERVER_ERROR,
            'something went wrong!' + error
        );
    }
};

const userMarkNotificationAsRead = async (req, res) => {
    try {
        const query = `
            UPDATE ${TABLE_NAMES.notifications_users}
            SET is_read = 1
            WHERE notification_id = ? AND user_id = ? AND recipient_type = '${USER_ROLES.customer}'
        `;

        await selectData(query, [
            req.params.notification_id,
            req.tokenPayload.user_id,
        ]);

        sendResponse(res, STATUS_CODE.OK, 'success');
    } catch (error) {
        sendResponse(
            res,
            STATUS_CODE.INTERNAL_SERVER_ERROR,
            'something went wrong!' + error
        );
    }
};

const userMarkAllNotificationsAsRead = async (req, res) => {
    try {
        const query = `
            UPDATE ${TABLE_NAMES.user_notifications}
            SET is_read = 1
            WHERE user_id = ? AND is_read = 0 AND recipient_type = '${USER_ROLES.customer}'
        `;

        await selectData(query, [req.tokenPayload.user_id]);

        sendResponse(res, STATUS_CODE.OK, 'success');
    } catch (error) {
        sendResponse(
            res,
            STATUS_CODE.INTERNAL_SERVER_ERROR,
            'something went wrong!' + error
        );
    }
};

const staffGetAllNotifications = async (req, res) => {
    try {
        const query = `
            SELECT
                noti.*,
                res.is_read

            FROM (
                SELECT * FROM ${TABLE_NAMES.notifications_users} WHERE user_id = ? AND recipient_type = '${USER_ROLES.staff}'
            ) AS res
            INNER JOIN ${TABLE_NAMES.notifications} AS noti ON noti.id = res.notification_id
            ORDER BY noti.date DESC
           
        
        `;

        const notifications = await selectData(query, [
            req.tokenPayload.user_id,
        ]);

        const newList = notifications.map(({ date, ...other }) => {
            other.date = convertTimeToGMT7(date);

            return other;
        });

        sendResponse(res, STATUS_CODE.OK, 'success', newList);
    } catch (error) {
        sendResponse(
            res,
            STATUS_CODE.INTERNAL_SERVER_ERROR,
            'something went wrong!' + error
        );
    }
};

const staffMarkNotificationAsRead = async (req, res) => {
    try {
        const query = `
            UPDATE ${TABLE_NAMES.notifications_users}
            SET is_read = 1
            WHERE notification_id = ? AND user_id = ? AND recipient_type = '${USER_ROLES.staff}'
        `;

        await selectData(query, [
            req.params.notification_id,
            req.tokenPayload.user_id,
        ]);

        sendResponse(res, STATUS_CODE.OK, 'success');
    } catch (error) {
        sendResponse(
            res,
            STATUS_CODE.INTERNAL_SERVER_ERROR,
            'something went wrong!' + error
        );
    }
};

const staffMarkAllNotificationsAsRead = async (req, res) => {
    try {
        const query = `
            UPDATE ${TABLE_NAMES.notifications_users}
            SET is_read = 1
            WHERE user_id = ? AND is_read = 0 AND recipient_type = '${USER_ROLES.staff}'
        `;

        await selectData(query, [req.tokenPayload.user_id]);

        sendResponse(res, STATUS_CODE.OK, 'success');
    } catch (error) {
        sendResponse(
            res,
            STATUS_CODE.INTERNAL_SERVER_ERROR,
            'something went wrong!' + error
        );
    }
};

const notificationController = {
    userGetAllNotifications,
    userMarkNotificationAsRead,
    userMarkAllNotificationsAsRead,
    staffGetAllNotifications,
    staffMarkNotificationAsRead,
    staffMarkAllNotificationsAsRead,
};

module.exports = notificationController;
