const router = require('express').Router();
const adminUsersController = require('../controllers/admin.users.controllers');
const middlewareControllers = require('../middlewares/verify.middlewares');

router.get(
    '/',
    middlewareControllers.verifyAdminRole,
    adminUsersController.getAllUser
);

module.exports = router;
