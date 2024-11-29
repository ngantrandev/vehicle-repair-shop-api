const express = require('express');

const authRoutes = require('./auth.route');
const adminRoutes = require('./admin.route');
const motorcycleBrandsRoute = require('@/src/routes/motorcycle.brands.route');
const servicesRoute = require('@/src/routes/services.route');
const motorcyclesRoute = require('@/src/routes/motorcycles.route');
const usersRoutes = require('@/src/routes/users.route');
const staffsRoutes = require('@/src/routes/staffs.route');
const stationsRoutes = require('@/src/routes/stations.route');
const addressesRoute = require('@/src/routes/addresses.route');
const itemsRoute = require('@/src/routes/items.route');
const bookingsRoute = require('@/src/routes/bookings.route');
const profileRoute = require('@/src/routes/profile.route');
const invoicesRoute = require('@/src/routes/invoices.route');
const paymentsRoute = require('@/src/routes/payments.route');

const {
    verifyToken,
    verifyAdminRole,
    verifyStaffRole,
} = require('@/src/middlewares/verify.middleware');

const apiRoute = express();

apiRoute.use('/auth', authRoutes);
apiRoute.use('/admin', verifyToken, verifyAdminRole, adminRoutes);

apiRoute.use('/users', verifyToken, usersRoutes);

apiRoute.use('/staffs', verifyToken, verifyStaffRole, staffsRoutes);

apiRoute.use('/motorcycle-brands', motorcycleBrandsRoute);

apiRoute.use('/services', servicesRoute);

apiRoute.use('/motorcycles', motorcyclesRoute);

apiRoute.use('/address', addressesRoute);

apiRoute.use('/stations', stationsRoutes);

apiRoute.use('/items', itemsRoute);

apiRoute.use('/bookings', verifyToken, bookingsRoute);

apiRoute.use('/profile', profileRoute);

apiRoute.use('/invoices', invoicesRoute);

apiRoute.use('/payments', paymentsRoute);

module.exports = apiRoute;
