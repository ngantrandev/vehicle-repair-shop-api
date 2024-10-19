const router = require('express').Router();

const cartsController = require('../controllers/carts.controller');
const bookingController = require('../controllers/booking.controller');
const bookingsController = require('../controllers/bookings.controller');
const middlewareControllers = require('../middlewares/verify.middleware');
const cartController = require('../controllers/cart.controller');
const uploadImgService = require('../services/uploadImageService');

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

router.post(
    '/bookings',
    uploadImgService.upload.single('file'),
    bookingController.createBooking
);

router.patch(
    '/bookings/:booking_id/cancel',
    bookingController.cancelBooking
);

module.exports = router;
