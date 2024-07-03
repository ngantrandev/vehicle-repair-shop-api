const { TABLE_NAMES, USER_ROLES } = require('../configs/constants.config');
const { STATUS_CODE } = require('../configs/status.codes.config');
const {
    selectData,
    excuteQuery,
    convertDateToGMT7,
    convertTimeToGMT7,
    getCurrentTimeInGMT7,
    hashPassWord,
    isValidInteger,
    sendResponse,
} = require('../ultil.lib');

const getUserById = async (req, res) => {
    if (!req.params.id) {
        sendResponse(res, STATUS_CODE.BAD_REQUEST, 'id is required');
        return;
    }

    if (!isValidInteger(req.params.id)) {
        sendResponse(res, STATUS_CODE.BAD_REQUEST, 'id must be interger');
        return;
    }

    const query = `SELECT * FROM ${TABLE_NAMES.users} WHERE id = ?`;

    const users = await selectData(query, [req.params.id]);

    if (users.length === 0) {
        sendResponse(res, STATUS_CODE.NOT_FOUND, 'User not found!');
        return;
    }

    const { password, ...other } = users[0];
    other.birthday = convertDateToGMT7(other.birthday);
    other.created_at = convertTimeToGMT7(other.created_at);

    sendResponse(res, STATUS_CODE.OK, 'Find user successfullly!', other);
};

const createUser = async (req, res) => {
    const requiredFields = [
        'username',
        'password',
        'firstname',
        'lastname',
        'email',
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

    /* FIND USER*/

    const findQuery = `
        SELECT * FROM ${TABLE_NAMES.users} WHERE username = ?
        UNION
        SELECT * FROM ${TABLE_NAMES.staffs} WHERE username = ? 
    `;

    const usersExist = await selectData(findQuery, [
        req.body.username,
        req.body.username,
    ]);

    if (usersExist.length > 0) {
        sendResponse(
            res,
            STATUS_CODE.CONFLICT,
            'This username already exists!'
        );
        return;
    }

    /** CREATE USER */

    const insertedFields = requiredFields.map((field) => ` ${field}`);

    const queryCreate = `INSERT INTO ${TABLE_NAMES.users} (${insertedFields}, role, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)`;

    const insertedValues = [];

    for (const field of requiredFields) {
        const value = req.body[field];
        if (field === 'password') {
            const hash = await hashPassWord(value);
            insertedValues.push(hash);
        } else {
            insertedValues.push(value);
        }
    }

    // add role value
    insertedValues.push(USER_ROLES.customer);
    // add time created
    insertedValues.push(getCurrentTimeInGMT7());

    const result = await excuteQuery(queryCreate, insertedValues);

    if (!result) {
        sendResponse(
            res,
            STATUS_CODE.INTERNAL_SERVER_ERROR,
            'Somthing went wrongs!'
        );

        return;
    }

    sendResponse(res, STATUS_CODE.OK, 'Created account successfully!');
};

const updateUser = async (req, res) => {
    if (!req.params.id) {
        sendResponse(res, STATUS_CODE.BAD_REQUEST, 'id is required');
        return;
    }

    if (!isValidInteger(req.params.id)) {
        sendResponse(res, STATUS_CODE.BAD_REQUEST, 'id must be interger');
        return;
    }

    /**FIND USER */
    const findUserQuery = `SELECT * FROM ${TABLE_NAMES.users} WHERE id = ?`;
    const usersFound = await selectData(findUserQuery, [req.params.id]);

    if (usersFound.length === 0) {
        sendResponse(res, STATUS_CODE.NOT_FOUND, 'User not found!');
        return;
    }

    const possibleFields = [
        'username',
        'password',
        'firstname',
        'lastname',
        'birthday',
        'image_file',
        'email',
        'address',
        'phone',
        'role',
    ];

    const updateFields = [];
    const updateValues = [];

    for (const field of possibleFields) {
        if (!req.body[field]) {
            continue;
        }

        if (field === 'password') {
            if (req.body[field].trim().length === 0) {
                sendResponse(
                    res,
                    STATUS_CODE.BAD_REQUEST,
                    'password connot empty'
                );
                return;
            }

            const hash = await hashPassWord(req.body[field]);
            updateFields.push(`${field} = ?`);
            updateValues.push(hash);
        } else if (field === 'image_file') {
            // save file
            // get file path
            // save path to field "image_url"
        } else {
            updateFields.push(`${field} = ?`);
            updateValues.push(req.body[field]);
        }
    }

    if (updateFields.length === 0) {
        sendResponse(res, STATUS_CODE.BAD_REQUEST, 'No fields to update');
        return;
    }

    try {
        const updateQuery = `
            UPDATE ${TABLE_NAMES.users}
            SET ${updateFields.join(', ')}
            WHERE id = ?
        `;

        const result = await excuteQuery(updateQuery, [
            ...updateValues,
            req.params.id,
        ]);

        if (!result) {
            sendResponse(
                res,
                STATUS_CODE.INTERNAL_SERVER_ERROR,
                'Cannot update user info at this time!'
            );
            return;
        }

        const querySelect = `SELECT * FROM ${TABLE_NAMES.users} WHERE id = ?`;
        const updatedUsers = await selectData(querySelect, [req.params.id]);

        const { password, ...otherUserInfo } = updatedUsers[0];
        otherUserInfo.created_at = convertTimeToGMT7(otherUserInfo.created_at);
        otherUserInfo.birthday = convertDateToGMT7(otherUserInfo.birthday);

        sendResponse(
            res,
            STATUS_CODE.OK,
            'Updated user info successfully!',
            otherUserInfo
        );
    } catch (error) {
        sendResponse(
            res,
            STATUS_CODE.INTERNAL_SERVER_ERROR,
            'something went wrongs!'
        );
    }
};

const deleteUser = async (req, res) => {
    if (!req.params.id) {
        sendResponse(res, STATUS_CODE.BAD_REQUEST, 'id is required');

        return;
    }

    if (!isValidInteger(req.params.id)) {
        sendResponse(res, STATUS_CODE.BAD_REQUEST, 'id must be interger');
        return;
    }

    /**DELETE USER */
    const deleteQuery = `DELETE FROM ${TABLE_NAMES.users} WHERE id = ?`;
    const result = await excuteQuery(deleteQuery, [req.params.id]);

    if (!result) {
        sendResponse(
            res,
            STATUS_CODE.INTERNAL_SERVER_ERROR,
            'Somthing went wrongs!'
        );

        return;
    } else if (result.affectedRows === 0) {
        sendResponse(res, STATUS_CODE.NOT_FOUND, 'user not found!');

        return;
    }

    sendResponse(res, STATUS_CODE.OK, 'Deleted account successfully!');
};

const adminUserControllers = {
    getUserById,
    createUser,
    deleteUser,
    updateUser,
};

module.exports = adminUserControllers;
