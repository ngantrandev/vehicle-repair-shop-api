const { STATUS_CODE } = require('../configs/status.codes.config');
const goongServices = require('../services/goongServices');
const { sendResponse } = require('../ultil/ultil.lib');

const autocompleteAddress = async (req, res) => {
    try {
        const { text: searchAddressText, longitude, latitude } = req.query;

        if(!searchAddressText) {
            sendResponse(res, STATUS_CODE.BAD_REQUEST, 'Search address text is required!');
            return;
        }

        const data = await goongServices.autocompleteAddress(searchAddressText);

        const newList = data.map(({
            structured_formatting,
            place_id
        })=>{
            return {
                place_id,
                address_name: structured_formatting.main_text,
                full_address: structured_formatting.secondary_text,
            }

        })

        sendResponse(res, 200, 'Get address successfully!', newList);
    } catch (error) {}
};

const getAddressByPlaceId = async (req, res) => {
    try {
        const { place_id } = req.query;

        if(!place_id) {
            sendResponse(res, STATUS_CODE.BAD_REQUEST, 'Place id is required!');
            return;
        }

        const data = await goongServices.getAddressByPlaceId(place_id);

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
        }

        sendResponse(res, 200, 'Get address by place id successfully!', address);
    } catch (error) {
        sendResponse(res, STATUS_CODE.INTERNAL_SERVER_ERROR, 'Something went wrong!');
    }
}

const addressController = {
    autocompleteAddress,
    getAddressByPlaceId,
}

module.exports = addressController;
