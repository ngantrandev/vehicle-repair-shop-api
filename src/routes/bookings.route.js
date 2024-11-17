const router = require('express').Router();

const { getBookingById } = require('../controllers/booking.controller');
const { verifyToken } = require('../middlewares/verify.middleware');

router.get('/:booking_id', verifyToken, getBookingById);

module.exports = router;
