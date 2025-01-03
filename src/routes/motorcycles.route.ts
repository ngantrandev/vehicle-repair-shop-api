import express from 'express';
const router = express.Router();

const motorcycleController = require('@/src/controllers/motorcycle.controller');
const motorcyclesController = require('@/src/controllers/motorcycles.controller');

router.get('/', motorcyclesController.getAllMotorcycles);

router.get(
    '/:motorcycle_id/services',
    motorcycleController.getAllServicesByMotorcycleId
);

export default router;
