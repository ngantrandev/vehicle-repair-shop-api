import express from 'express';
const router = express.Router();

import { getAllStaffs } from '@/src/controllers/admin.staffs.controller';
import {
    createStaff,
    deactivateStaff,
    getStaffById,
    updateStaff,
} from '@/src/controllers/admin.staff.controller';

router.get('/', getAllStaffs);

router.get('/:staff_id', getStaffById);

router.post('/', createStaff);

router.patch('/:staff_id', updateStaff);

router.patch('/:staff_id/deactivate', deactivateStaff);

export default router;
