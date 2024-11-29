const router = require('express').Router();

const {
    createPayment,
    getReturnInfo,
} = require('@/src/controllers/payments.controller');

router.post('/create', createPayment);

router.get('/result', getReturnInfo);

module.exports = router;
