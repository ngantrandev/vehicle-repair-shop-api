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

const goongServices = {
    getDistanceMatrixFromUserAddrToOtherStations,
};

module.exports = goongServices;
