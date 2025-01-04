import express from 'express';
const router = express.Router();

import { getServiceCategory } from '@/src/controllers/category.controller';
import {
    getAllServices,
    getTopServices,
} from '@/src/controllers/services.controller';
import { getServiceById } from '@/src/controllers/service.controller';

router.get('/', getAllServices);

router.get('/top', getTopServices);

router.get('/categories', getServiceCategory);

router.get('/:service_id', getServiceById);

export default router;
