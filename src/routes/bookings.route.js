const adminBookingController = require('../controllers/admin.booking.controller');
const bookingController = require('../controllers/booking.controller');

const router = require('express').Router();

router.get('/', adminBookingController.getAllBooking);

router.patch('/:booking_id/undo', bookingController.undoCancelBooking);

module.exports = router;
