const router = require('express').Router();

const {
    prePayment,
    getReturnInfo,
    completePayment,
} = require('@/src/controllers/payments.controller');

router.post('/create', prePayment);

router.post('/complete', completePayment);

router.get('/result', getReturnInfo);

module.exports = router;
