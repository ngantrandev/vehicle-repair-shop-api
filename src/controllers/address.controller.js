const { STATUS_CODE } = require('@/src/configs/status.codes.config');
const goongServices = require('@/src/services/goongServices');
const { sendResponse, decodePolyline } = require('@/src/ultil/ultil.lib');

const autocompleteAddress = async (req, res) => {
    try {
        const { input: searchAddressText, longitude, latitude } = req.query;

        if (!searchAddressText) {
            sendResponse(res, STATUS_CODE.BAD_REQUEST, 'input is required!');
            return;
        }

        const data = await goongServices.autocompleteAddress(
            searchAddressText,
            latitude,
            longitude
        );

        const newList = data.reduce(
            (acc, { structured_formatting, place_id, compound }) => {
                const { district, commune, province } = compound;

                if (district && commune && province) {
                    acc.push({
                        place_id,
                        address_name: structured_formatting.main_text,
                        full_address: structured_formatting.secondary_text,
                    });
                }

                return acc;
            },
            []
        );
        sendResponse(res, STATUS_CODE.OK, 'Get address successfully!', newList);
    } catch (error) {
        sendResponse(
            res,
            STATUS_CODE.INTERNAL_SERVER_ERROR,
            'Something went wrong!' + error
        );
    }
};

const reverseGeocode = async (req, res) => {
    try {
        const { lat, lng } = req.query;

        if (!lat || !lng) {
            sendResponse(
                res,
                STATUS_CODE.BAD_REQUEST,
                'Latitude and longitude are required!'
            );
            return;
        }

        const data = await goongServices.reverseGeocode(lat, lng);

        const newList = data.reduce(
            (acc, { place_id, name, address, compound }) => {
                const { district, commune, province } = compound;

                if (district && commune && province) {
                    acc.push({
                        place_id,
                        address_name: name,
                        full_address: address,
                    });
                }

                return acc;
            },
            []
        );
        sendResponse(res, STATUS_CODE.OK, 'Get reverse geocode successfully!', newList);
    } catch (error) {
        sendResponse(
            res,
            STATUS_CODE.INTERNAL_SERVER_ERROR,
            'Something went wrong!' + error
        );
    }
};

const getAddressDetailByPlaceId = async (req, res) => {
    try {
        const { place_id } = req.query;

        if (!place_id) {
            sendResponse(res, STATUS_CODE.BAD_REQUEST, 'place_id is required!');
            return;
        }

        const data = await goongServices.getAddressDetailByPlaceId(place_id);

        const results = data.results;

        const locations = results[0].geometry.location;
        const placeId = results[0].place_id;
        const addressName = results[0].name;
        const fullAddress = results[0].address;

        const address = {
            place_id: placeId,
            address_name: addressName,
            full_address: fullAddress,
            latitude: locations.lat,
            longitude: locations.lng,
        };

        sendResponse(
            res,
            STATUS_CODE.OK,
            'Get address by place id successfully!',
            address
        );
    } catch (error) {
        sendResponse(
            res,
            STATUS_CODE.INTERNAL_SERVER_ERROR,
            'Something went wrong!' + error
        );
    }
};

const getGeoJsonCoordinatesDirection = async (req, res) => {
    let { origin, destination, vehicle } = req.query;

    if (!vehicle) {
        vehicle = 'bike';
    }

    if (!origin || !destination) {
        sendResponse(
            res,
            STATUS_CODE.BAD_REQUEST,
            'origin and destination are required!'
        );
        return;
    }

    const data = await goongServices.getDirection(origin, destination, vehicle);

    let geojson = {
        type: 'Feature',
        geometry: {
            type: 'LineString',
            coordinates: [],
        },
    };

    let coordinates = [];

    // Assuming res.routes[0].overview_polyline.points contains the encoded polyline
    if (data.routes && data.routes[0]) {
        const overviewPolyline = data.routes[0].overview_polyline.points;
        coordinates = decodePolyline(overviewPolyline);
        geojson = {
            type: 'Feature',
            geometry: {
                type: 'LineString',
                coordinates,
            },
        };
    }

    sendResponse(
        res,
        STATUS_CODE.OK,
        'Get direction successfully!',
        coordinates
    );
};

const addressController = {
    autocompleteAddress,
    reverseGeocode,
    getAddressDetailByPlaceId,
    getGeoJsonCoordinatesDirection,
};

module.exports = addressController;
