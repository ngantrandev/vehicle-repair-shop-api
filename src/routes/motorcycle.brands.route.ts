import express from 'express';
const router = express.Router();

import { getAllMotorcycleBrands } from '@/src/controllers/motorcycle.brands.controller';
import {
    getAllMotorcyclesByBrandId,
    getAllServicesByBrandId,
    getBrandById,
} from '@/src/controllers/motorcycle.brand.controller';

router.get('/', getAllMotorcycleBrands);

router.get('/:brand_id', getBrandById);

router.get('/:brand_id/motorcycles', getAllMotorcyclesByBrandId);
router.get('/:brand_id/services', getAllServicesByBrandId);

export default router;
