const router = require('express').Router();

const uploadImgService = require('@/src/services/uploadImageService');

const {
    createPayment,
    getReturnInfo,
} = require('@/src/controllers/payments.controller');

router.post('/create', uploadImgService.upload.single('file'), createPayment);

router.get('/result', getReturnInfo);

module.exports = router;
