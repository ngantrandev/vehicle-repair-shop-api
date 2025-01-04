import express from 'express';
const router = express.Router();

import { undoBooking } from '@/src/controllers/booking.controller';
import {
    getAllBooking,
    getLatestBooking,
} from '@/src/controllers/bookings.controller';
import {
    assignBookingToEmployee,
    confirmBooking,
} from '@/src/controllers/admin.booking.controller';

router.get('/', getAllBooking);

router.get('/latest', getLatestBooking);

router.patch('/:booking_id/undo', undoBooking);

router.patch('/:booking_id/confirm', confirmBooking);

router.patch('/:booking_id/assign', assignBookingToEmployee);

export default router;
