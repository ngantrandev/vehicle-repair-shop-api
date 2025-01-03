import express from 'express';
const router = express.Router();

const adminServiceControllers = require('@/src/controllers/admin.service.controller');
import { fileMemoryStorage } from '@/src/services/storage.service';

router.post(
    '/',
    fileMemoryStorage.single('file'),
    adminServiceControllers.createService
);

router.patch(
    '/:service_id',
    fileMemoryStorage.single('file'),
    adminServiceControllers.updateService
);

router.delete('/:service_id', adminServiceControllers.deleteService);

export default router;
