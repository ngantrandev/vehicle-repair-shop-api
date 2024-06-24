const express = require('express');
const authRoutes = require('./auth.routes');

const apiRoute = express();

apiRoute.use('/auth', authRoutes);

module.exports = apiRoute;
