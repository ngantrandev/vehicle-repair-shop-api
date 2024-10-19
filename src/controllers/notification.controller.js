const { TABLE_NAMES } = require('../configs/constants.config');
const { STATUS_CODE } = require('../configs/status.codes.config');
const { sendResponse, selectData } = require('../ultil/ultil.lib');

const getAllNotifications = async (req, res) => {
    try {
        const query = `
            SELECT
                noti.*,
                users.firstname AS user_firstname,
                users.lastname AS user_lastname

            FROM ${TABLE_NAMES.notifications} AS noti
            INNER JOIN ${TABLE_NAMES.users} AS users ON users.id = noti.receiver_id
            WHERE noti.receiver_id = ?
        
        `;

        const notifications = await selectData(query, [
            req.tokenPayload.user_id,
        ]);

        const newList = notifications.map(
            ({ receiver_id, user_firstname, user_lastname, ...other }) => {
                other.receiver = {
                    id: receiver_id,
                    firstname: user_firstname,
                    lastname: user_lastname,
                };

                return other;
            }
        );

        sendResponse(res, STATUS_CODE.OK, 'success', newList);
    } catch (error) {
        sendResponse(
            res,
            STATUS_CODE.INTERNAL_SERVER_ERROR,
            'something went wrong!' + error
        );
    }
};

const markNotificationAsRead = async (req, res) => {
    try {
        const query = `
            UPDATE ${TABLE_NAMES.notifications}
            SET is_read = 1
            WHERE id = ? AND receiver_id = ?
        `;

        await selectData(query, [req.params.notification_id, req.tokenPayload.user_id]);

        sendResponse(res, STATUS_CODE.OK, 'success');
    } catch (error) {
        sendResponse(
            res,
            STATUS_CODE.INTERNAL_SERVER_ERROR,
            'something went wrong!' + error
        );
    }
};

const markAllNotificationsAsRead = async (req, res) => {
    try {
        const query = `
            UPDATE ${TABLE_NAMES.notifications}
            SET is_read = 1
            WHERE receiver_id = ? AND is_read = 0
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
}

const notificationController = {
    getAllNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead
};

module.exports = notificationController;
