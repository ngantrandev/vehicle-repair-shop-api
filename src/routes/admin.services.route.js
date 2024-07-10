const adminServiceControllers = require('../controllers/admin.service.controller');

const router = require('express').Router();

router.post('/', adminServiceControllers.createService);

router.patch('/:service_id', adminServiceControllers.updateService);

router.delete('/:service_id', adminServiceControllers.deleteService);

module.exports = router;
