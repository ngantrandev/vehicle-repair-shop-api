const { TABLE_NAMES } = require('../configs/constants.config');
const { STATUS_CODE } = require('../configs/status.codes.config');
const {
    selectData,
    convertDateToGMT7,
    convertTimeToGMT7,
    sendResponse,
} = require('../ultil/ultil.lib');

const getAllUser = async (req, res) => {
    try {
        const query = `
        SELECT
            u.*,
            addr.latitude AS address_latitude,
            addr.longitude AS address_longitude,
            addr.id AS address_id,
            addr.place_id AS place_id,
            addr.address_name AS address_name,
            addr.full_address AS full_address
        FROM (
            SELECT * FROM ${TABLE_NAMES.users}
        ) AS u
        LEFT JOIN
            ${TABLE_NAMES.addresses} AS addr ON addr.id = u.address_id
    `;

        const users = await selectData(query, []);

        const newUsers = users
            .filter(({ username }) => req.tokenPayload.username !== username)
            .map(
                ({
                    password,
                    address_id,
                    address_latitude,
                    address_longitude,
                    place_id,
                    address_name,
                    full_address,
                    ...other
                }) => {
                    other.birthday = convertDateToGMT7(other.birthday);
                    other.created_at = convertTimeToGMT7(other.created_at);

                    if (!address_id) {
                        other.address = null;
                        return other;
                    }

                    other.address = {
                        id: address_id,
                        latitude: address_latitude,
                        longitude: address_longitude,
                        place_id: place_id,
                        address_name: address_name,
                        full_address: full_address,
                    };

                    return other;
                }
            );

        sendResponse(
            res,
            STATUS_CODE.OK,
            'Get all users successfully!',
            newUsers
        );
    } catch (error) {
        sendResponse(
            res,
            STATUS_CODE.INTERNAL_SERVER_ERROR,
            'something went wrong'
        );
    }
};

const userController = {
    getAllUser,
};

module.exports = userController;
