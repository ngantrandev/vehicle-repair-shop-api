const express = require('express');

const adminUsersRoute = require('./admin.users.route');
const adminServicesRoute = require('./admin.services.route');
const adminStaffsRoute = require('./admin.staffs.route');
const adminBookingRoute = require('./admin.bookings.route');
const statisticsRoute = require('./statistics.route');

const adminRoutes = express();

adminRoutes.use('/users', adminUsersRoute);

adminRoutes.use('/services', adminServicesRoute);

adminRoutes.use('/staffs', adminStaffsRoute);

adminRoutes.use('/bookings', adminBookingRoute);

adminRoutes.use('/statistics', statisticsRoute);

module.exports = adminRoutes;
