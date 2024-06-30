const servicesControllers = require('../controllers/services.controller');
const serviceControllers = require('../controllers/service.controller');
const adminServiceControllers = require('../controllers/admin.service.controller');

const router = require('express').Router();

router.get('/', servicesControllers.getAllServices);

router.get('/:id', serviceControllers.getServiceById);

router.post('/', adminServiceControllers.createService);

router.patch('/:id', adminServiceControllers.updateService);

router.delete('/:id', adminServiceControllers.deleteService);

module.exports = router;
