const path = require('path');
const sharp = require('sharp');

const { TABLE_NAMES } = require('../configs/constants.config');
const { STATUS_CODE } = require('../configs/status.codes.config');
const {
    sendResponse,
    selectData,
    excuteQuery,
    isValidInteger,
    convertTimeToGMT7,
    convertDateToGMT7,
} = require('../ultil/ultil.lib');
const { QUERY_SELECT_USER_BY_USERNAME } = require('../configs/queries.config');

const getUserByUsername = async (req, res) => {
    if (!req.params.username) {
        sendResponse(
            res,
            STATUS_CODE.BAD_REQUEST,
            'Missing username in params!'
        );
        return;
    }

    try {
        const query = QUERY_SELECT_USER_BY_USERNAME;

        const users = await selectData(query, [req.params.username]);

        const {
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
        } = users[0];

        other.created_at = convertTimeToGMT7(other.created_at);
        other.birthday = convertDateToGMT7(other.birthday);

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

        sendResponse(
            res,
            STATUS_CODE.OK,
            'Get user by username successfully!',
            other
        );
    } catch (error) {
        sendResponse(
            res,
            STATUS_CODE.INTERNAL_SERVER_ERROR,
            'Cannot get user by username at this time!' + error
        );
    }
};

const updateUserProfile = async (req, res) => {
    if (!req.params.user_id) {
        sendResponse(
            res,
            STATUS_CODE.BAD_REQUEST,
            'Missing user_id in params!'
        );
        return;
    }

    if (!isValidInteger(req.params.user_id)) {
        sendResponse(
            res,
            STATUS_CODE.BAD_REQUEST,
            'user_id must be an integer!'
        );

        return;
    }
    const requiredFields = [
        'username',
        'firstname',
        'lastname',
        'birthday',
        'email',
        'phone',
    ];

    for (const field of requiredFields) {
        if (!req.body[field]) {
            sendResponse(
                res,
                STATUS_CODE.BAD_REQUEST,
                `Missing required field: ${field}`
            );
            return;
        }
    }

    try {
        const updateFields = [];
        const updateValues = [];

        for (const field of requiredFields) {
            const value = req.body[field];
            if (field === 'username') {
                // find username existed
                const usernameQuery = `SELECT * FROM ${TABLE_NAMES.users} WHERE username = ? AND id != ?`;

                const usernameExisted = await selectData(usernameQuery, [
                    req.body.username,
                    req.params.user_id,
                ]);

                if (usernameExisted.length > 0) {
                    sendResponse(
                        res,
                        STATUS_CODE.CONFLICT,
                        'Username already existed!'
                    );
                    return;
                }

                updateFields.push(`${field} = ?`);
                updateValues.push(req.body[field]);
            } else if (field === 'password') {
                const hash = await hashPassWord(value);

                updateFields.push(`${field} = ?`);
                updateValues.push(hash);
            } else {
                updateFields.push(`${field} = ?`);
                updateValues.push(req.body[field]);
            }
        }

        let fileName = '';
        let relativePath = ''; /** path from root dir to image */

        if (req.file) {
            const buffer = req.file.buffer;
            fileName = Date.now() + '.webp';
            relativePath = path.join('./uploads', fileName);

            try {
                await sharp(buffer).webp({ quality: 20 }).toFile(relativePath);

                updateFields.push('image_url = ?');
                updateValues.push(relativePath);
            } catch (error) {
                sendResponse(
                    res,
                    STATUS_CODE.INTERNAL_SERVER_ERROR,
                    'cannot update user info at this time'
                );
                return;
            }
        }

        if (updateFields.length === 0) {
            sendResponse(res, STATUS_CODE.BAD_REQUEST, 'No fields to update');
            return;
        }

        const updateQuery = `
            UPDATE ${TABLE_NAMES.users}
            SET ${updateFields}
            WHERE id = ?
        `;

        const result = await excuteQuery(updateQuery, [
            ...updateValues,
            req.params.user_id,
        ]);

        if (!result) {
            sendResponse(
                res,
                STATUS_CODE.INTERNAL_SERVER_ERROR,
                'Cannot update user info at this time!'
            );
            return;
        }

        sendResponse(res, STATUS_CODE.OK, 'Updated user profile successfully!');
    } catch (error) {
        sendResponse(
            res,
            STATUS_CODE.INTERNAL_SERVER_ERROR,
            'Cannot update user profile at this time!'
        );
    }
};

const profileController = {
    updateUserProfile,
    getUserByUsername,
};

module.exports = profileController;
