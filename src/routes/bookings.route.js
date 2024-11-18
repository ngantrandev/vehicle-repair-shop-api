const router = require('express').Router();

const {
    getBookingById,
    undoBooking,
} = require('../controllers/booking.controller');
const { verifyToken } = require('../middlewares/verify.middleware');

router.get('/:booking_id', verifyToken, getBookingById);

router.patch('/:booking_id/undo', undoBooking);

module.exports = router;
