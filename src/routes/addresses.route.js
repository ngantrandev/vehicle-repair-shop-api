const router = require('express').Router();

const addressesController = require('../controllers/addresses.controller');
const addressController = require('../controllers/address.controller');

router.get('/provinces', addressesController.getProvinces);

router.get(
    '/provinces/:provinceId/districts',
    addressesController.getDistrictsByProvinceId
);

router.get(
    '/districts/:districtId/wards',
    addressesController.getWardsByDistrictId
);

// Address routes
router.get('/autocomplete', addressController.autocompleteAddress);
router.get('/reverse', addressController.reverseGeocode);
router.get('/detail', addressController.getAddressDetailByPlaceId);
router.get('/GeoJsonLineDirection', addressController.getGeoJsonCoordinatesDirection);

module.exports = router;
