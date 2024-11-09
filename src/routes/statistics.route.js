const router = require('express').Router();

const statisticsController = require('../controllers/statistics.controller');

router.get('/revenue', statisticsController.getRevenue);

module.exports = router;
