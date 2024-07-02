const adminServiceControllers = require('../controllers/admin.service.controller');

const router = require('express').Router();

router.post('/', adminServiceControllers.createService);

router.patch('/:id', adminServiceControllers.updateService);

router.delete('/:id', adminServiceControllers.deleteService);

module.exports = router;
