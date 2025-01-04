import express from 'express';
const router = express.Router();

import {
    createPaymentUrl,
    getVNPayReturn,
    getVNPayIPN,
} from '@/src/controllers/payments.controller';

router.post('/create-url', createPaymentUrl);

router.get('/vnpay-result', getVNPayReturn);

router.get('/vnpay-ipn', getVNPayIPN);

export default router;
