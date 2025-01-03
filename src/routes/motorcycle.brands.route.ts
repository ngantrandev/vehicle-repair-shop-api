import express from 'express';
const router = express.Router();

const motorcycleBrandsController = require('@/src/controllers/motorcycle.brands.controller');
const motorcycleBrandController = require('@/src/controllers/motorcycle.brand.controller');

router.get('/', motorcycleBrandsController.getAllMotorcycleBrands);

router.get('/:brand_id', motorcycleBrandController.getBrandById);

router.get(
    '/:brand_id/motorcycles',
    motorcycleBrandController.getAllMotorcyclesByBrandId
);
router.get(
    '/:brand_id/services',
    motorcycleBrandController.getAllServicesByBrandId
);

export default router;
