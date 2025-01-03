import express from 'express';
const router = express.Router();

const servicesControllers = require('@/src/controllers/services.controller');
const serviceControllers = require('@/src/controllers/service.controller');
const categoriesController = require('@/src/controllers/category.controller');

router.get('/', servicesControllers.getAllServices);

router.get('/top', servicesControllers.getTopServices);

router.get('/categories', categoriesController.getServiceCategory);

router.get('/:service_id', serviceControllers.getServiceById);

export default router;
