const router = require('express').Router();

const addressesController = require('../controllers/addresses.controller');

router.get('/provinces', addressesController.getProvinces);

router.get(
    '/provinces/:provinceId/districts',
    addressesController.getDistrictsByProvinceId
);

router.get(
    '/districts/:districtId/wards',
    addressesController.getWardsByDistrictId
);

module.exports = router;
