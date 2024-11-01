const { TABLE_NAMES } = require('../configs/constants.config');
const { STATUS_CODE } = require('../configs/status.codes.config');
const { sendResponse, selectData, convertTimeToGMT7 } = require('../ultil/ultil.lib');

const userGetAllNotifications = async (req, res) => {
    try {
        const query = `
            SELECT
                noti.*,
                res.is_read

            FROM (
                SELECT * FROM ${TABLE_NAMES.user_notifications} WHERE user_id = ?
            ) AS res
            INNER JOIN ${TABLE_NAMES.notifications} AS noti ON noti.id = res.notification_id
           
        
        `;

        const notifications = await selectData(query, [
            req.tokenPayload.user_id,
        ]);

        const newList = notifications.map(({date, ...other}) => {
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
            UPDATE ${TABLE_NAMES.user_notifications}
            SET is_read = 1
            WHERE notification_id = ? AND user_id = ?
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
            WHERE user_id = ? AND is_read = 0
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
                SELECT * FROM ${TABLE_NAMES.staff_notifications} WHERE staff_id = ?
            ) AS res
            INNER JOIN ${TABLE_NAMES.notifications} AS noti ON noti.id = res.notification_id
           
        
        `;

        const notifications = await selectData(query, [
            req.tokenPayload.user_id,
        ]);

        const newList = notifications.map(({date, ...other}) => {
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
            UPDATE ${TABLE_NAMES.staff_notifications}
            SET is_read = 1
            WHERE notification_id = ? AND staff_id = ?
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
            UPDATE ${TABLE_NAMES.staff_notifications}
            SET is_read = 1
            WHERE staff_id = ? AND is_read = 0
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
