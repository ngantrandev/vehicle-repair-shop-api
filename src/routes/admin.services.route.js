const adminServiceControllers = require('@/src/controllers/admin.service.controller');
const uploadImgService = require('@/src/services/uploadImageService');

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
