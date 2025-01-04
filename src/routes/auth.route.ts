import express from 'express';
const router = express.Router();

import {
    register,
    signin,
    staffSignin,
    userForgotPassword,
    userResetPassword,
} from '@/src/controllers/auth.controller';

router.post('/signin', signin);
router.post('/signin/staff', staffSignin);
router.post('/register', register);
router.post('/forgot-password', userForgotPassword);
router.post('/reset-password', userResetPassword);

export default router;
