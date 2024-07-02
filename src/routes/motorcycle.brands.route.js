const router = require('express').Router();

const motorcycleBrandsController = require('../controllers/motorcycle.brands.controller');
const motorcycleBrandController = require('../controllers/motorcycle.brand.controller');

router.get('/', motorcycleBrandsController.getAllMotorcycleBrands);

router.get('/:id', motorcycleBrandController.getBrandById);

router.get(
    '/:id/motorcycles',
    motorcycleBrandController.getAllMotorcyclesByBrandId
);
router.get('/:id/services', motorcycleBrandController.getAllServicesByBrandId);

module.exports = router;
