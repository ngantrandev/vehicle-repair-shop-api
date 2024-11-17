const router = require('express').Router();

const { getAllItem } = require('../controllers/items.controller');

router.get('/', getAllItem);

module.exports = router;
