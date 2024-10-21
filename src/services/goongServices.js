const { STATUS_CODE } = require('../configs/status.codes.config');
const goongHttpRequests = require('../ultil/goongHttpRequests');

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

const autocompleteAddress =async (text)=>{
    const apiPath = '/place/autocomplete';
    const params = {
        input: text,
        api_key: process.env.GOONG_API_KEY,
    }

    const res = await goongHttpRequests.get(apiPath, params);

    if (!res || res.status !== STATUS_CODE.OK) {
        return null;
    }

    const resData = res.data?.predictions;

    return resData;
}

const getAddressByPlaceId = async (place_id) => {
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
}

const goongServices = {
    getDistanceMatrixFromUserAddrToOtherStations,
    autocompleteAddress,
    getAddressByPlaceId,
};

module.exports = goongServices;
