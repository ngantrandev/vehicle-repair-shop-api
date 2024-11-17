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
const itemsRoute = require('../routes/items.route');
const bookingsRoute = require('../routes/bookings.route');
const profileRoute = require('../routes/profile.route');

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

apiRoute.use('/address', addressesRoute);

apiRoute.use('/stations', stationsRoutes);

apiRoute.use('/items', itemsRoute);

apiRoute.use('/bookings', bookingsRoute);

apiRoute.use('/profile', profileRoute);

module.exports = apiRoute;
