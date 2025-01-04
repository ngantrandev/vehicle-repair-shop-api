import express from 'express';
const router = express.Router();

import { getAllServicesByMotorcycleId } from '@/src/controllers/motorcycle.controller';
import { getAllMotorcycles } from '@/src/controllers/motorcycles.controller';

router.get('/', getAllMotorcycles);

router.get('/:motorcycle_id/services', getAllServicesByMotorcycleId);

export default router;
