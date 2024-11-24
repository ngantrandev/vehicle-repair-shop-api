const servicesControllers = require('@/src/controllers/services.controller');
const serviceControllers = require('@/src/controllers/service.controller');
const categoriesController = require('@/src/controllers/category.controller');

const router = require('express').Router();

router.get('/', servicesControllers.getAllServices);

router.get('/top', servicesControllers.getTopServices);

router.get('/categories', categoriesController.getServiceCategory);

router.get('/:service_id', serviceControllers.getServiceById);

module.exports = router;
