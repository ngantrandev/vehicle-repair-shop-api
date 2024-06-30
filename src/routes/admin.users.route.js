const router = require('express').Router();
const adminUserControllers = require('../controllers/admin.user.controller');
const adminUsersController = require('../controllers/admin.users.controller');

router.get('/', adminUsersController.getAllUser);

router.get('/:id', adminUserControllers.getUserById);

router.post('/', adminUserControllers.createUser);

router.patch('/:id', adminUserControllers.updateUser);

router.delete('/:id', adminUserControllers.deleteUser);

module.exports = router;
