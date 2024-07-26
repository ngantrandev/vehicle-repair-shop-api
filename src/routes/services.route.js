const servicesControllers = require('../controllers/services.controller');
const serviceControllers = require('../controllers/service.controller');
const categoriesController = require('../controllers/category.controller');

const router = require('express').Router();

router.get('/', servicesControllers.getAllServices);

router.get('/categories', categoriesController.getServiceCategory);

router.get('/:service_id', serviceControllers.getServiceById);

module.exports = router;
