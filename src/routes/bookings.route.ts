import express from 'express';
const router = express.Router();

import {
    getBookingById,
    undoBooking,
} from '@/src/controllers/booking.controller';
import { verifyToken } from '@/src/middlewares/verify.middleware';

router.get('/:booking_id', verifyToken, getBookingById);

router.patch('/:booking_id/undo', undoBooking);

export default router;
