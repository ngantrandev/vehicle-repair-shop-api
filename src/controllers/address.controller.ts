import { CustomRequest } from '@/src/types/requests';
import { Response } from 'express';

import { STATUS_CODE } from '@/src/configs/status.codes.config';
import goongServices from '@/src/services/goong.service';
import { sendResponse, decodePolyline } from '@/src/ultil/ultil.lib';

export const autocompleteAddress = async (
    req: CustomRequest,
    res: Response
) => {
    try {
        const { input: searchAddressText, longitude, latitude } = req.query;

        if (!searchAddressText) {
            sendResponse(res, STATUS_CODE.BAD_REQUEST, 'input is required!');
            return;
        }

        const data = await goongServices.autocompleteAddress(
            searchAddressText as string,
            Number(latitude),
            Number(longitude)
        );

        const newList = data?.reduce(
            (acc: any[], { structured_formatting, place_id, compound }) => {
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

export const reverseGeocode = async (req: CustomRequest, res: Response) => {
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

        const data = await goongServices.reverseGeocode(
            Number(lat),
            Number(lng)
        );

        const newList = data?.reduce(
            (acc: any[], { place_id, name, address, compound }) => {
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
        sendResponse(
            res,
            STATUS_CODE.OK,
            'Get reverse geocode successfully!',
            newList
        );
    } catch (error) {
        sendResponse(
            res,
            STATUS_CODE.INTERNAL_SERVER_ERROR,
            'Something went wrong!' + error
        );
    }
};

export const getAddressDetailByPlaceId = async (
    req: CustomRequest,
    res: Response
) => {
    try {
        const { place_id } = req.query;

        if (!place_id) {
            sendResponse(res, STATUS_CODE.BAD_REQUEST, 'place_id is required!');
            return;
        }

        const data = await goongServices.getAddressDetailByPlaceId(
            place_id as string
        );

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

export const getGeoJsonCoordinatesDirection = async (
    req: CustomRequest,
    res: Response
) => {
    let { origin, destination, vehicle } = req.query as {
        origin: string;
        destination: string;
        vehicle?: string;
    };

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
