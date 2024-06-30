const express = require('express');

const adminUsersRoute = require('./admin.users.route');
const adminServicesRoute = require('./admin.services.route');

const adminRoutes = express();

adminRoutes.use('/users', adminUsersRoute);

adminRoutes.use('/services', adminServicesRoute);

module.exports = adminRoutes;
