const router = require('express').Router();

const {
    getAllItem,
    addItemToBooking,
    removeItemFromBooking,
    getAllItemOfBooking,
    addItemToService,
    removeItemFromService,
    getAllItemOfService,
} = require('../controllers/items.controller');

router.get('/', getAllItem);

router.get('/booking', getAllItemOfBooking);

router.post('/booking/add', addItemToBooking);

router.patch('/booking/remove', removeItemFromBooking);

router.get('/service', getAllItemOfService);

router.post('/service/add', addItemToService);

router.patch('/service/remove', removeItemFromService);

module.exports = router;
