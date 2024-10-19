const router = require('express').Router();
const adminUserControllers = require('../controllers/admin.user.controller');
const adminUsersController = require('../controllers/admin.users.controller');

router.get('/', adminUsersController.getAllUser);

router.get('/:user_id', adminUserControllers.getUserById);

router.post('/', adminUserControllers.createUser);

router.patch('/:user_id', adminUserControllers.updateUser);

router.patch('/:user_id/deactivate', adminUserControllers.deactivateUser);

// router.delete('/:user_id', adminUserControllers.deleteUser);

module.exports = router;
