import express from 'express';
const router = express.Router();

const bookingController = require('@/src/controllers/booking.controller');
const bookingsController = require('@/src/controllers/bookings.controller');
const adminBookingController = require('@/src/controllers/admin.booking.controller');

router.get('/', bookingsController.getAllBooking);

router.get('/latest', bookingsController.getLatestBooking);

router.patch('/:booking_id/undo', bookingController.undoBooking);

router.patch('/:booking_id/confirm', adminBookingController.confirmBooking);

router.patch(
    '/:booking_id/assign',
    adminBookingController.assignBookingToEmployee
);

export default router;
