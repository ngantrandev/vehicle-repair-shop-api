import { messaging } from '@/src/configs/firebase.config';
import { isValidUrl } from '@/src/ultil/ultil.lib';

export const sendNotificationToTopic = async (
    title: string,
    subtitle: string,
    topic: string,
    imageUrl?: string
) => {
    if (!title || !subtitle || !topic) {
        throw new Error('Invalid parameters');
    }

    let payload = {};

    if (imageUrl && isValidUrl(imageUrl)) {
        payload = {
            title,
            message: subtitle,
            imageUrl,
        };
    } else {
        payload = {
            title,
            message: subtitle,
        };
    }

    const message = {
        data: payload,
        topic: topic,
    };

    try {
        const response = await messaging().send(message);
        console.log('Successfully sent message to topic:', response);
    } catch (error) {
        console.log('Error sending message to topic:', error);
    }
};

export const sendNotificationToDevice = async (
    title: string,
    subtitle: string,
    token: string,
    imageUrl?: string
) => {
    if (!title || !subtitle || !token) {
        throw new Error('Invalid parameters');
    }

    let payload = {};

    if (imageUrl && isValidUrl(imageUrl)) {
        payload = {
            title,
            body: subtitle,
            imageUrl,
        };
    } else {
        payload = {
            title,
            message: subtitle,
        };
    }

    const message = {
        notification: payload,
        token: token,
    };

    try {
        const response = await messaging().send(message);
        console.log('Successfully sent message to device:', response);
    } catch (error) {
        console.log('Error sending message to device:', error);
    }
};
