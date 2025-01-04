import { CustomRequest } from '@/src/types/requests';
import { NotificationResponse } from '@/src/types/responses';
import { Response } from 'express';

import { TABLE_NAMES, USER_ROLES } from '@/src/configs/constants.config';
import { STATUS_CODE } from '@/src/configs/status.codes.config';
import {
    sendResponse,
    selectData,
    convertTimeToGMT7,
} from '@/src/ultil/ultil.lib';
import { sendNotificationToTopic } from '@/src/services/firebase.service';

export const userGetAllNotifications = async (
    req: CustomRequest,
    res: Response
) => {
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

        const notifications: NotificationResponse[] = (await selectData(query, [
            req.tokenPayload.user_id,
        ])) as NotificationResponse[];

        const newList = notifications.map((notification) => {
            const { date } = notification;
            notification.date = convertTimeToGMT7(date);

            return notification;
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

export const userMarkNotificationAsRead = async (
    req: CustomRequest,
    res: Response
) => {
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

export const userMarkAllNotificationsAsRead = async (
    req: CustomRequest,
    res: Response
) => {
    try {
        const query = `
            UPDATE ${TABLE_NAMES.notifications_users}
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

export const staffGetAllNotifications = async (
    req: CustomRequest,
    res: Response
) => {
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

        const notifications: NotificationResponse[] = (await selectData(query, [
            req.tokenPayload.user_id,
        ])) as NotificationResponse[];

        const newList = notifications.map((notification) => {
            const { date } = notification;

            notification.date = convertTimeToGMT7(date);

            return notification;
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

export const staffMarkNotificationAsRead = async (
    req: CustomRequest,
    res: Response
) => {
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

export const staffMarkAllNotificationsAsRead = async (
    req: CustomRequest,
    res: Response
) => {
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

export const testSendNoti = async (req: CustomRequest, res: Response) => {
    try {
        const { user_id, title, content, role } = req.query;

        const topic = `${role}_${user_id}`;

        if (title) {
            await sendNotificationToTopic(
                title as string,
                content as string,
                topic as string
            );
        }

        sendResponse(res, STATUS_CODE.OK, 'success');
    } catch (error) {
        sendResponse(
            res,
            STATUS_CODE.INTERNAL_SERVER_ERROR,
            'something went wrong!' + error
        );
    }
};
