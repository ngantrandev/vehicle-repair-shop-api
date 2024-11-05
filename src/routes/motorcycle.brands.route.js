const router = require('express').Router();

const motorcycleBrandsController = require('../controllers/motorcycle.brands.controller');
const motorcycleBrandController = require('../controllers/motorcycle.brand.controller');

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

module.exports = router;
