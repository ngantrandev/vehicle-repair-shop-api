const express = require('express');
const authRoutes = require('./auth.route');

const middlewareControllers = require('../middlewares/verify.middleware');
const adminRoutes = require('./admin.route');

const apiRoute = express();

apiRoute.use('/auth', authRoutes);
apiRoute.use(
    '/admin',
    middlewareControllers.verifyToken,
    middlewareControllers.verifyAdminRole,
    adminRoutes
);

module.exports = apiRoute;
