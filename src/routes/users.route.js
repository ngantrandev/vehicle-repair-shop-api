const router = require('express').Router();

const cartsController = require('../controllers/carts.controller');
const middlewareControllers = require('../middlewares/verify.middleware');

router.get(
    '/:user_id/carts',
    middlewareControllers.verifyToken,
    middlewareControllers.verifyOwner,
    cartsController.getAllUserCarts
);

module.exports = router;
