const router = require('express').Router();

const staffBookingController = require('../controllers/staff.booking.controller');
const middlewareControllers = require('../middlewares/verify.middleware');

router.get(
    '/:staff_id/bookings',
    middlewareControllers.verifyCurrentStaff,
    staffBookingController.getAllBookingAssignedToStaff
);

router.patch(
    '/:staff_id/bookings/:booking_id/set_fixing',
    middlewareControllers.verifyCurrentStaff,
    staffBookingController.setBookingStatusToFixing
);

router.patch(
    '/:staff_id/bookings/:booking_id/set_done',
    middlewareControllers.verifyCurrentStaff,
    staffBookingController.setBookingStatusToDone
);

module.exports = router;
