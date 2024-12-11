const admin = require('firebase-admin');

const serviceAccount = require('@/fcm.serviceaccount.key.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:
        'https://repair-shop-app-default-rtdb.asia-southeast1.firebasedatabase.app',
});

const messaging = admin.messaging;

module.exports = messaging;
