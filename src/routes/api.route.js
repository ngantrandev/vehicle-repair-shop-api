const express = require('express');

const authRoutes = require('./auth.route');
const middlewareControllers = require('../middlewares/verify.middleware');
const adminRoutes = require('./admin.route');
const motorcycleBrandsRoute = require('../routes/motorcycle.brands.route');
const servicesRoute = require('../routes/services.route');
const motorcyclesRoute = require('../routes/motorcycles.route');
const usersRoutes = require('../routes/users.route');
const staffsRoutes = require('../routes/staffs.route');
const stationsRoutes = require('../routes/stations.route');
const addressesRoute = require('../routes/addresses.route');
const bookingController = require('../controllers/booking.controller');
const profileController = require('../controllers/profile.controller');
const { upload } = require('../services/uploadImageService');

const apiRoute = express();

apiRoute.use('/auth', authRoutes);
apiRoute.use(
    '/admin',
    middlewareControllers.verifyToken,
    middlewareControllers.verifyAdminRole,
    adminRoutes
);

apiRoute.use('/users', middlewareControllers.verifyToken, usersRoutes);

apiRoute.use(
    '/staffs',
    middlewareControllers.verifyToken,
    middlewareControllers.verifyStaffRole,
    staffsRoutes
);

apiRoute.use('/motorcycle-brands', motorcycleBrandsRoute);

apiRoute.use('/services', servicesRoute);

apiRoute.use('/motorcycles', motorcyclesRoute);

apiRoute.use('/addresses', addressesRoute);

apiRoute.use('/stations', stationsRoutes);

apiRoute.get('/bookings/:booking_id', bookingController.getBookingById);

apiRoute.get('/profile/:username', profileController.getUserByUsername);

apiRoute.patch(
    '/profile/:user_id',
    upload.single('file'),
    profileController.updateUserProfile
);

module.exports = apiRoute;
