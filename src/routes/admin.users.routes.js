const router = require('express').Router();
const adminUserControllers = require('../controllers/admin.user.controllers');
const adminUsersController = require('../controllers/admin.users.controllers');
const { route } = require('./auth.routes');

router.get('/', adminUsersController.getAllUser);

router.get('/:id', adminUserControllers.getUserById);

router.post('/', adminUserControllers.createUser);

router.patch('/:id', adminUserControllers.updateUser);

router.delete('/:id', adminUserControllers.deleteUser);

module.exports = router;
