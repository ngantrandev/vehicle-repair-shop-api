const express = require('express');
const authRoutes = require('./auth.route');

const middlewareControllers = require('../middlewares/verify.middleware');
const adminRoutes = require('./admin.route');
const motorcycleBrandsRoute = require('../routes/motorcycle.brands.route');
const servicesRoute = require('../routes/services.route');
const motorcyclesRoute = require('../routes/motorcycles.route');
const usersRoutes = require('../routes/users.route');
const staffsRoutes = require('../routes/staffs.route');
const addressesRoute = require('../routes/addresses.route');
const stationController = require('../controllers/station.controller');
const bookingController = require('../controllers/booking.controller');

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

apiRoute.get('/stations', stationController.getAllServiceStations);

apiRoute.get('/stations/:station_id/staffs', stationController.getAllStaffOfServiceStation);

apiRoute.get('/bookings/:booking_id', bookingController.getBookingById);

module.exports = apiRoute;
