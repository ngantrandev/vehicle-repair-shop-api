import admin, { ServiceAccount } from 'firebase-admin';

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || '{}');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount),
    databaseURL:
        'https://repair-shop-app-default-rtdb.asia-southeast1.firebasedatabase.app',
});

export const messaging = admin.messaging;
