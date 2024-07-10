const { TABLE_NAMES } = require('../configs/constants.config');
const { STATUS_CODE } = require('../configs/status.codes.config');
const {
    selectData,
    convertDateToGMT7,
    convertTimeToGMT7,
    sendResponse,
} = require('../ultil.lib');

const getAllUser = async (req, res) => {
    try {
        const query = `
        SELECT
            u.*,
            addr.street AS address_street,
            addr.latitude AS address_latitude,
            addr.longitude AS address_longitude,
            w.id AS ward_id,
            w.name AS ward_name,
            d.id AS district_id,
            d.name AS district_name,
            p.id AS province_id,
            p.name AS province_name

        FROM ${TABLE_NAMES.users} AS u
        LEFT JOIN
            ${TABLE_NAMES.addresses} AS addr ON addr.id = u.address_id
        LEFT JOIN
            ${TABLE_NAMES.wards} AS w ON w.id = addr.ward_id
        LEFT JOIN
            ${TABLE_NAMES.districts} AS d ON d.id = w.district_id
        LEFT JOIN
            ${TABLE_NAMES.provinces} AS p ON p.id = d.province_id
    `;

        const users = await selectData(query, []);

        const newUsers = users
            .filter(({ username }) => req.tokenPayload.username !== username)
            .map(
                ({
                    password,
                    address_id,
                    address_street,
                    address_latitude,
                    address_longitude,
                    ward_id,
                    ward_name,
                    district_id,
                    district_name,
                    province_id,
                    province_name,
                    ...other
                }) => {
                    other.birthday = convertDateToGMT7(other.birthday);
                    other.created_at = convertTimeToGMT7(other.created_at);

                    other.address =
                        address_id === null
                            ? null
                            : {
                                  id: address_id,
                                  street: address_street,
                                  latitude: address_latitude,
                                  longitude: address_longitude,
                                  ward: {
                                      id: ward_id,
                                      name: ward_name,
                                  },
                                  district: {
                                      id: district_id,
                                      name: district_name,
                                  },
                                  province: {
                                      id: province_id,
                                      name: province_name,
                                  },
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
