import express from 'express';
const router = express.Router();

const addressesController = require('@/src/controllers/addresses.controller');
const addressController = require('@/src/controllers/address.controller');

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
router.get(
    '/GeoJsonLineDirection',
    addressController.getGeoJsonCoordinatesDirection
);

export default router;
