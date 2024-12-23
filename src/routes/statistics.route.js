const router = require('express').Router();

const statisticsController = require('@/src/controllers/statistics.controller');

router.get('/revenue', statisticsController.getRevenue);

router.get('/top-items', statisticsController.topItems);

router.get('/top-staffs', statisticsController.topStaffs);

module.exports = router;
