const bookingController = require('@/src/controllers/booking.controller');
const bookingsController = require('@/src/controllers/bookings.controller');
const adminBookingController = require('@/src/controllers/admin.booking.controller');

const router = require('express').Router();

router.get('/', bookingsController.getAllBooking);

router.get('/latest', bookingsController.getLatestBooking);

router.patch('/:booking_id/undo', bookingController.undoBooking);

router.patch('/:booking_id/confirm', adminBookingController.confirmBooking);

router.patch(
    '/:booking_id/assign',
    adminBookingController.assignBookingToEmployee
);

module.exports = router;
