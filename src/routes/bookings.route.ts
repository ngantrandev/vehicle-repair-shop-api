import express from 'express';
const router = express.Router();

const {
    getBookingById,
    undoBooking,
} = require('@/src/controllers/booking.controller');
const { verifyToken } = require('@/src/middlewares/verify.middleware');

router.get('/:booking_id', verifyToken, getBookingById);

router.patch('/:booking_id/undo', undoBooking);

export default router;