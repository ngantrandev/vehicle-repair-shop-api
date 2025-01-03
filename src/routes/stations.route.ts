import express from 'express';
const router = express.Router();

const stationController = require('@/src/controllers/station.controller');

router.get('/', stationController.getAllServiceStations);

router.post('/', stationController.createStation);

router.get('/:station_id', stationController.getStationById);

router.patch('/:station_id', stationController.updateStation);

router.delete('/:station_id', stationController.deleteStation);

router.get(
    '/:station_id/staffs',
    stationController.getAllStaffOfServiceStation
);

export default router;
