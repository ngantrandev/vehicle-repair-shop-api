const messaging = require('../firebaseConfig.js');
const { isValidUrl } = require('./ultil.lib.js');

const sendNotificationToTopic = async (
    title,
    subtitle,
    topic,
    imageUrl = ''
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

const sendNotificationToDevice = async (
    title,
    subtitle,
    token,
    imageUrl = ''
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

module.exports = {
    sendNotificationToTopic,
    sendNotificationToDevice,
};
