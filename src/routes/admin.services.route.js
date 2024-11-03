const adminServiceControllers = require('../controllers/admin.service.controller');
const uploadImgService = require('../services/uploadImageService');

const router = require('express').Router();

router.post(
    '/',
    uploadImgService.upload.single('file'),
    adminServiceControllers.createService
);

router.patch(
    '/:service_id',
    uploadImgService.upload.single('file'),
    adminServiceControllers.updateService
);

router.delete('/:service_id', adminServiceControllers.deleteService);

module.exports = router;
