const adminStaffsController = require('../controllers/admin.staffs.controller');
const adminStaffController = require('../controllers/admin.staff.controller');

const router = require('express').Router();

router.get('/', adminStaffsController.getAllStaffs);

router.get('/:id', adminStaffController.getStaffById);

router.post('/', adminStaffController.createStaff);

router.patch('/:id', adminStaffController.updateStaff);

router.patch('/:id/deactivate', adminStaffController.deactivateStaff);

// router.delete('/:id', adminStaffController.deleteStaff);

module.exports = router;
