import express from 'express';
const router = express.Router();

import {
    cancelBooking,
    createBooking,
    getBookingById,
} from '@/src/controllers/booking.controller';
import { fileMemoryStorage } from '@/src/services/storage.service';
import {
    userGetAllNotifications,
    userMarkAllNotificationsAsRead,
    userMarkNotificationAsRead,
} from '@/src/controllers/notification.controller';
import { getAllBookingAssignedToStaff } from '@/src/controllers/staff.booking.controller';

// Bookings routes
router.get('/bookings', getAllBookingAssignedToStaff);

router.get('/bookings/:booking_id', getBookingById);

router.post('/bookings', fileMemoryStorage.single('file'), createBooking);

router.patch('/bookings/:booking_id/cancel', cancelBooking);

// Notification routes
router.get('/notifications', userGetAllNotifications);
router.patch(
    '/notifications/:notification_id/mark_read',
    userMarkNotificationAsRead
);
router.patch('/notifications/mark_all_read', userMarkAllNotificationsAsRead);

export default router;
