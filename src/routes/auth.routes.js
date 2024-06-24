const authController = require('../controllers/auth.controllers');

const router = require('express').Router();

router.post('/signin', authController.signin);

module.exports = router;
