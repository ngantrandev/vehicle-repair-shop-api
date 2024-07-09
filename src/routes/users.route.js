const router = require('express').Router();

const cartsController = require('../controllers/carts.controller');
const bookingController = require('../controllers/booking.controller');
const bookingsController = require('../controllers/bookings.controller');
const middlewareControllers = require('../middlewares/verify.middleware');
const cartController = require('../controllers/cart.controller');

router.get(
    '/:user_id/carts',
    middlewareControllers.verifyToken,
    middlewareControllers.verifyOwner,
    cartsController.getAllUserCarts
);

router.post(
    '/:user_id/carts',
    middlewareControllers.verifyToken,
    middlewareControllers.verifyOwner,
    cartController.createCart
);

router.delete('/:user_id/carts/:cart_id', cartController.deleteCartById);

router.post(
    '/:user_id/carts/:cart_id/bookings',
    middlewareControllers.verifyToken,
    middlewareControllers.verifyOwner,
    cartController.createBookingFromCart
);

router.get(
    '/:user_id/bookings',
    middlewareControllers.verifyToken,
    middlewareControllers.verifyOwner,
    bookingsController.getAllBookingByUserId
);

router.get(
    '/:user_id/bookings/:booking_id',
    middlewareControllers.verifyToken,
    middlewareControllers.verifyOwner,
    bookingController.getBookingById
);

router.post('/:user_id/bookings', bookingController.createBooking);

router.patch('/:user_id/bookings/:booking_id', bookingController.cancelBooking);

module.exports = router;
