const adminStaffsController = require('../controllers/admin.staffs.controller');
const adminStaffController = require('../controllers/admin.staff.controller');

const router = require('express').Router();

router.get('/', adminStaffsController.getAllStaffs);

router.get('/:staff_id', adminStaffController.getStaffById);

router.post('/', adminStaffController.createStaff);

router.patch('/:staff_id', adminStaffController.updateStaff);

router.patch('/:staff_id/deactivate', adminStaffController.deactivateStaff);

// router.delete('/:staff_id', adminStaffController.deleteStaff);

module.exports = router;
