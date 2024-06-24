const express = require('express');
const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const middlewareControllers = require('../middlewares/verify.middlewares');

const apiRoute = express();

apiRoute.use('/auth', authRoutes);
apiRoute.use('/user', middlewareControllers.verifyToken, userRoutes);

module.exports = apiRoute;
