import express from 'express';
const router = express.Router();

const authController = require('@/src/controllers/auth.controller');

router.post('/signin', authController.signin);
router.post('/signin/staff', authController.staffSignin);
router.post('/register', authController.register);
router.post('/forgot-password', authController.userForgotPassword);
router.post('/reset-password', authController.userResetPassword);

export default router;
