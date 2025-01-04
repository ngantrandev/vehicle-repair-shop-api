import express from 'express';
const router = express.Router();

import {
    getRevenue,
    topItems,
    topStaffs,
} from '@/src/controllers/statistics.controller';

router.get('/revenue', getRevenue);

router.get('/top-items', topItems);

router.get('/top-staffs', topStaffs);

export default router;
