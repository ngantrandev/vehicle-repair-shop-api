const router = require('express').Router();

const {
    createPaymentUrl,
    getVNPayReturn,
    getVNPayIPN,
} = require('@/src/controllers/payments.controller');

router.post('/create-url', createPaymentUrl);

router.get('/vnpay-result', getVNPayReturn);

router.get('/vnpay-ipn', getVNPayIPN);

module.exports = router;
