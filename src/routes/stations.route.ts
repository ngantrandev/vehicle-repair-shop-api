import express from 'express';
const router = express.Router();

import {
    createStation,
    deleteStation,
    getAllServiceStations,
    getAllStaffOfServiceStation,
    getStationById,
    updateStation,
} from '@/src/controllers/station.controller';

router.get('/', getAllServiceStations);

router.post('/', createStation);

router.get('/:station_id', getStationById);

router.patch('/:station_id', updateStation);

router.delete('/:station_id', deleteStation);

router.get('/:station_id/staffs', getAllStaffOfServiceStation);

export default router;
