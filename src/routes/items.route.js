const router = require('express').Router();

const {
    getAllItem,
    addItemToBooking,
    removeItemFromBooking,
    getBookingItems,
} = require('../controllers/items.controller');

router.get('/', getAllItem);

router.get('/booking', getBookingItems);

router.post('/add', addItemToBooking);

router.patch('/remove', removeItemFromBooking);

module.exports = router;
