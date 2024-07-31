const express = require('express');

const adminUsersRoute = require('./admin.users.route');
const adminServicesRoute = require('./admin.services.route');
const adminStaffsRoute = require('./admin.staffs.route');
const adminBookingController = require('../controllers/admin.booking.controller');
const adminStaffsController = require('../controllers/admin.staffs.controller');

const adminRoutes = express();

adminRoutes.use('/users', adminUsersRoute);

adminRoutes.use('/services', adminServicesRoute);

adminRoutes.use('/staffs', adminStaffsRoute);

adminRoutes.use('/bookings', adminBookingController.getAllBooking);

adminRoutes.use(
    '/stations/:station_id/staffs',
    adminStaffsController.getAllStaffOfServiceStation
);

module.exports = adminRoutes;
