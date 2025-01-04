import express from 'express';
const router = express.Router();

import {
    autocompleteAddress,
    getAddressDetailByPlaceId,
    getGeoJsonCoordinatesDirection,
    reverseGeocode,
} from '@/src/controllers/address.controller';

// Address routes
router.get('/autocomplete', autocompleteAddress);
router.get('/reverse', reverseGeocode);
router.get('/detail', getAddressDetailByPlaceId);
router.get('/GeoJsonLineDirection', getGeoJsonCoordinatesDirection);

export default router;
