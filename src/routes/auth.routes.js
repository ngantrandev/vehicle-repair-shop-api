const authController = require('../controllers/auth.controllers');

const router = require('express').Router();

router.post('/signin', authController.signin);
router.post('/register', authController.register);

module.exports = router;
