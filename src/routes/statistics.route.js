const router = require('express').Router();

const statisticsController = require('@/src/controllers/statistics.controller');

router.get('/revenue', statisticsController.getRevenue);

module.exports = router;
