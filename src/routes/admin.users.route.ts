import express from 'express';
const router = express.Router();

const adminUserControllers = require('@/src/controllers/admin.user.controller');
const adminUsersController = require('@/src/controllers/admin.users.controller');

router.get('/', adminUsersController.getAllUser);

router.get('/:user_id', adminUserControllers.getUserById);

router.post('/', adminUserControllers.createUser);

router.patch('/:user_id', adminUserControllers.updateUser);

router.patch('/:user_id/deactivate', adminUserControllers.deactivateUser);

export default router;
