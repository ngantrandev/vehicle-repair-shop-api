const router = require('express').Router();

const bookingController = require('../controllers/booking.controller');
const staffBookingController = require('../controllers/staff.booking.controller');
const middlewareControllers = require('../middlewares/verify.middleware');
const notificationController = require('../controllers/notification.controller');

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
