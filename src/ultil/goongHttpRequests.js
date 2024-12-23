const axios = require('axios');
const { STATUS_CODE } = require('@/src/configs/status.codes.config');

if (!process.env.GOONG_MAP_BASE_API_ENPOINT) {
    throw new Error(
        'Missing Goong Map API Endpoint. Please check your .env file.'
    );
}

const httpRequest = axios.create({
    baseURL: process.env.GOONG_MAP_BASE_API_ENPOINT,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

const get = async (apiPath, params = {}) => {
    try {
        const res = await httpRequest.get(apiPath, {
            params: {
                ...params,
            },
        });

        if (res.status !== STATUS_CODE.OK) {
            return null;
        }

        return res;
    } catch (error) {
        throw new Error(error);
    }
};

// export default httpRequest;

const goongHttpRequests = {
    get,
};

module.exports = goongHttpRequests;
