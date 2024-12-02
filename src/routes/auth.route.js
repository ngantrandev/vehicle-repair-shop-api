const authController = require('@/src/controllers/auth.controller');

const router = require('express').Router();

router.post('/signin', authController.signin);
router.post('/signin/staff', authController.staffSignin);
router.post('/register', authController.register);
router.post('/forgot-password', authController.userForgotPassword);
router.post('/reset-password', authController.userResetPassword);

module.exports = router;
