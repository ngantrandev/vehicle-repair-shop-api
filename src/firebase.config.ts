const admin = require('firebase-admin');

import serviceAccount from '@/fcm.serviceaccount.key.json';

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:
        'https://repair-shop-app-default-rtdb.asia-southeast1.firebasedatabase.app',
});

export const messaging = admin.messaging;
