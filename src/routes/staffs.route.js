const router = require('express').Router();

const bookingController = require('@/src/controllers/booking.controller');
const staffBookingController = require('@/src/controllers/staff.booking.controller');
const notificationController = require('@/src/controllers/notification.controller');

router.get('/bookings', staffBookingController.getAllBookingAssignedToStaff);

router.patch(
    '/bookings/:booking_id/set_fixing',
    staffBookingController.setBookingStatusToFixing
);

router.patch(
    '/bookings/:booking_id/set_done',
    bookingController.setBookingStatusToDone
);

// Notification routes
router.get('/notifications', notificationController.staffGetAllNotifications);
router.patch(
    '/notifications/:notification_id/mark_read',
    notificationController.staffMarkNotificationAsRead
);
router.patch(
    '/notifications/mark_all_read',
    notificationController.staffMarkAllNotificationsAsRead
);

module.exports = router;
