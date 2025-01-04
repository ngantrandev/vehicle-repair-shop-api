import { STATUS_CODE } from '@/src/configs/status.codes.config';
const goongHttpRequests = require('@/src/ultil/goongHttpRequests');

const goongRestApiKey = process.env.GOONG_API_KEY;

type PointList = [[number, number]][];

export const getDistanceMatrix = async (origins: any, destinations: any) => {
    /**
     * origins and destinations are arrays of arrays: [[lat, lng], [lat, lng], ...]
     */

    const apiPath = '/DistanceMatrix';
    const params = {
        origins: origins.join('|'),
        destinations: destinations.join('|'),
        api_key: goongRestApiKey,
    };

    const res = await goongHttpRequests.get(apiPath, params);

    if (!res || res.status !== STATUS_CODE.OK) {
        return null;
    }

    const resData = res.data;

    return resData;
};

export const autocompleteAddress = async (
    input: string,
    latitude: number,
    longitude: number
) => {
    const apiPath = '/place/autocomplete';
    const params = {
        input: input,
        location: `${latitude},${longitude}`,
        limit: 10,
        radius: 10,
        api_key: goongRestApiKey,
    };

    const res = await goongHttpRequests.get(apiPath, params);

    if (!res || res.status !== STATUS_CODE.OK) {
        return null;
    }

    const resData = res.data?.predictions;

    return resData;
};

//convert address to geocode
export const forwardGeocode = async (address: string) => {
    const apiPath = '/geocode';
    const params = {
        address,
        api_key: goongRestApiKey,
    };

    const res = await goongHttpRequests.get(apiPath, params);

    if (!res || res.status !== STATUS_CODE.OK) {
        return null;
    }

    const resData = res.data;

    return resData;
};

export const reverseGeocode = async (latitude: number, longitude: number) => {
    const apiPath = '/geocode';
    const params = {
        latlng: `${latitude},${longitude}`,
        api_key: goongRestApiKey,
    };

    const res = await goongHttpRequests.get(apiPath, params);

    if (!res || res.status !== STATUS_CODE.OK) {
        return null;
    }

    const resData = res.data?.results;

    return resData;
};

export const getAddressDetailByPlaceId = async (place_id: string) => {
    const apiPath = '/geocode';
    const params = {
        place_id,
        api_key: goongRestApiKey,
    };

    const res = await goongHttpRequests.get(apiPath, params);

    if (!res || res.status !== STATUS_CODE.OK) {
        return null;
    }

    const resData = res.data;

    return resData;
};

export const getDirection = async (
    origin: PointList,
    destination: PointList,
    vehicle: string
) => {
    const apiPath = '/Direction';
    const params = {
        origin,
        destination,
        vehicle,
        api_key: goongRestApiKey,
    };

    const res = await goongHttpRequests.get(apiPath, params);

    if (!res || res.status !== STATUS_CODE.OK) {
        return null;
    }

    const resData = res.data;

    return resData;
};
