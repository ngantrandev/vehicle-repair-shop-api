import express from 'express';
const router = express.Router();

const cartsController = require('@/src/controllers/carts.controller');
const bookingController = require('@/src/controllers/booking.controller');
const bookingsController = require('@/src/controllers/bookings.controller');
const middlewareControllers = require('@/src/middlewares/verify.middleware');
const cartController = require('@/src/controllers/cart.controller');
import { fileMemoryStorage } from '@/src/services/storage.service';
const notificationController = require('@/src/controllers/notification.controller');

router.get(
    '/:user_id/carts',
    middlewareControllers.verifyCurrentUser,
    cartsController.getAllUserCarts
);

router.post(
    '/:user_id/carts',
    middlewareControllers.verifyCurrentUser,
    cartController.createCart
);

router.delete(
    '/:user_id/carts/:cart_id',
    middlewareControllers.verifyCurrentUser,
    cartController.deleteCartById
);

router.post(
    '/:user_id/carts/:cart_id/bookings',
    middlewareControllers.verifyCurrentUser,
    cartController.createBookingFromCart
);

// Bookings routes
router.get('/bookings', bookingsController.getAllBooking);

router.get('/bookings/:booking_id', bookingController.getBookingById);

router.post(
    '/bookings',
    fileMemoryStorage.single('file'),
    bookingController.createBooking
);

router.patch('/bookings/:booking_id/cancel', bookingController.cancelBooking);

// Notification routes
router.get('/notifications', notificationController.userGetAllNotifications);
router.patch(
    '/notifications/:notification_id/mark_read',
    notificationController.userMarkNotificationAsRead
);
router.patch(
    '/notifications/mark_all_read',
    notificationController.userMarkAllNotificationsAsRead
);

export default router;
