import express from 'express';
const router = express.Router();

const adminStaffsController = require('@/src/controllers/admin.staffs.controller');
const adminStaffController = require('@/src/controllers/admin.staff.controller');

router.get('/', adminStaffsController.getAllStaffs);

router.get('/:staff_id', adminStaffController.getStaffById);

router.post('/', adminStaffController.createStaff);

router.patch('/:staff_id', adminStaffController.updateStaff);

router.patch('/:staff_id/deactivate', adminStaffController.deactivateStaff);

// router.delete('/:staff_id', adminStaffController.deleteStaff);

export default router;
