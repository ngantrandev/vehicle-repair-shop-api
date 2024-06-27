const express = require('express');
const authRoutes = require('./auth.routes');
const adminUsersRoutes = require('./admin.users.routes');
const middlewareControllers = require('../middlewares/verify.middlewares');

const apiRoute = express();

apiRoute.use('/auth', authRoutes);
apiRoute.use('/admin/users', middlewareControllers.verifyToken, adminUsersRoutes);

module.exports = apiRoute;
