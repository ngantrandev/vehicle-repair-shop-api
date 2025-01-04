import admin, { ServiceAccount } from 'firebase-admin';

import serviceAccount from '@/fcm.serviceaccount.key.json';

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount),
    databaseURL:
        'https://repair-shop-app-default-rtdb.asia-southeast1.firebasedatabase.app',
});

export const messaging = admin.messaging;
