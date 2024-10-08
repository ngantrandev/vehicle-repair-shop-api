const authController = require('../controllers/auth.controller');

const router = require('express').Router();

router.post('/signin', authController.signin);
router.post('/register', authController.register);

module.exports = router;
