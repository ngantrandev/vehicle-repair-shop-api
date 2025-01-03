import express from 'express';
const router = express.Router();

const {
    createPaymentUrl,
    getVNPayReturn,
    getVNPayIPN,
} = require('@/src/controllers/payments.controller');

router.post('/create-url', createPaymentUrl);

router.get('/vnpay-result', getVNPayReturn);

router.get('/vnpay-ipn', getVNPayIPN);

export default router;
