const axios = require('axios');
const { STATUS_CODE } = require('../configs/status.codes.config');

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
        console.log('error', error);
        throw new Error(error);
    }
};

// export default httpRequest;

const goongHttpRequests = {
    get,
};

module.exports = goongHttpRequests;
