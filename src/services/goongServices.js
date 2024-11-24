const { STATUS_CODE } = require('@/src/configs/status.codes.config');
const goongHttpRequests = require('@/src/ultil/goongHttpRequests');

const getDistanceMatrixFromUserAddrToOtherStations = async (
    origins,
    destinations
) => {
    /**
     * origins and destinations are arrays of arrays: [[lat, lng], [lat, lng], ...]
     */

    const apiPath = '/DistanceMatrix';
    const params = {
        origins: origins.join('|'),
        destinations: destinations.join('|'),
        api_key: process.env.GOONG_API_KEY,
    };

    const res = await goongHttpRequests.get(apiPath, params);

    if (!res || res.status !== STATUS_CODE.OK) {
        return null;
    }

    const resData = res.data;

    return resData;
};

const autocompleteAddress = async (input, latitude, longitude) => {
    const apiPath = '/place/autocomplete';
    const params = {
        input: input,
        location: `${latitude},${longitude}`,
        limit: 10,
        radius: 10,
        api_key: process.env.GOONG_API_KEY,
    };

    const res = await goongHttpRequests.get(apiPath, params);

    if (!res || res.status !== STATUS_CODE.OK) {
        return null;
    }

    const resData = res.data?.predictions;

    return resData;
};

//convert address to geocode
const forwardGeocode = async (address) => {
    const apiPath = '/geocode';
    const params = {
        address,
        api_key: process.env.GOONG_API_KEY,
    };

    const res = await goongHttpRequests.get(apiPath, params);

    if (!res || res.status !== STATUS_CODE.OK) {
        return null;
    }

    const resData = res.data;

    return resData;
};

const reverseGeocode = async (latitude, longitude) => {
    const apiPath = '/geocode';
    const params = {
        latlng: `${latitude},${longitude}`,
        api_key: process.env.GOONG_API_KEY,
    };

    const res = await goongHttpRequests.get(apiPath, params);

    if (!res || res.status !== STATUS_CODE.OK) {
        return null;
    }

    const resData = res.data?.results;

    return resData;
};

const getAddressDetailByPlaceId = async (place_id) => {
    const apiPath = '/geocode';
    const params = {
        place_id,
        api_key: process.env.GOONG_API_KEY,
    };

    const res = await goongHttpRequests.get(apiPath, params);

    if (!res || res.status !== STATUS_CODE.OK) {
        return null;
    }

    const resData = res.data;

    return resData;
};

const getDirection = async (origin, destination, vehicle) => {
    const apiPath = '/Direction';
    const params = {
        origin,
        destination,
        vehicle,
        api_key: process.env.GOONG_API_KEY,
    };

    const res = await goongHttpRequests.get(apiPath, params);

    if (!res || res.status !== STATUS_CODE.OK) {
        return null;
    }

    const resData = res.data;

    return resData;
};

const goongServices = {
    getDistanceMatrixFromUserAddrToOtherStations,
    autocompleteAddress,
    forwardGeocode,
    reverseGeocode,
    getAddressDetailByPlaceId,
    getDirection,
};

module.exports = goongServices;
