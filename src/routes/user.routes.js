const router = require('express').Router();
const userController = require('../controllers/user.controllers');
const middlewareControllers = require('../middlewares/verify.middlewares');

router.get(
    '/',
    middlewareControllers.verifyStaffRole,
    userController.getAllUser
);

module.exports = router;
