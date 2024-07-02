const router = require('express').Router();

const motorcycleController = require('../controllers/motorcycle.controller');
const motorcyclesController = require('../controllers/motorcycles.controller');

router.get('/', motorcyclesController.getAllMotorcycles);

router.get('/:id/services', motorcycleController.getAllServicesByMotorcycleId);

module.exports = router;
