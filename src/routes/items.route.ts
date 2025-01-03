import express from 'express';
const router = express.Router();

const {
    getAllItem,
    addItemToBooking,
    removeItemFromBooking,
    getAllItemOfBooking,
    addItemToService,
    removeItemFromService,
    getAllItemOfService,
    createItem,
    updateItem,
} = require('@/src/controllers/items.controller');

router.post('/', createItem);

router.patch('/:item_id', updateItem);

router.get('/', getAllItem);

router.get('/booking', getAllItemOfBooking);

router.post('/booking/add', addItemToBooking);

router.patch('/booking/remove', removeItemFromBooking);

router.get('/service', getAllItemOfService);

router.post('/service/add', addItemToService);

router.patch('/service/remove', removeItemFromService);

export default router;
