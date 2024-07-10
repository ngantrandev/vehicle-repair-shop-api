const servicesControllers = require('../controllers/services.controller');
const serviceControllers = require('../controllers/service.controller');

const router = require('express').Router();

router.get('/', servicesControllers.getAllServices);

router.get('/:service_id', serviceControllers.getServiceById);

module.exports = router;
