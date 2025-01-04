import express from 'express';
const router = express.Router();

import { setBookingStatusToDone } from '@/src/controllers/booking.controller';
import {
    getAllBookingAssignedToStaff,
    setBookingStatusToFixing,
} from '@/src/controllers/staff.booking.controller';
import {
    staffGetAllNotifications,
    staffMarkAllNotificationsAsRead,
    staffMarkNotificationAsRead,
} from '@/src/controllers/notification.controller';

router.get('/bookings', getAllBookingAssignedToStaff);

router.patch('/bookings/:booking_id/set_fixing', setBookingStatusToFixing);

router.patch('/bookings/:booking_id/set_done', setBookingStatusToDone);

// Notification routes
router.get('/notifications', staffGetAllNotifications);
router.patch(
    '/notifications/:notification_id/mark_read',
    staffMarkNotificationAsRead
);
router.patch('/notifications/mark_all_read', staffMarkAllNotificationsAsRead);

export default router;
