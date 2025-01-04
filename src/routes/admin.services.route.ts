import express from 'express';
const router = express.Router();

import {
    createService,
    deleteService,
    updateService,
} from '@/src/controllers/admin.service.controller';
import { fileMemoryStorage } from '@/src/services/storage.service';

router.post('/', fileMemoryStorage.single('file'), createService);

router.patch('/:service_id', fileMemoryStorage.single('file'), updateService);

router.delete('/:service_id', deleteService);

export default router;
