const { TABLE_NAMES, USER_ROLES } = require('../configs/constants.config');
const {
    selectData,
    excuteQuery,
    convertDateToGMT7,
    convertTimeToGMT7,
    getCurrentTimeInGMT7,
    hashPassWord,
    isValidInteger,
} = require('../ultil.lib');

const getUserById = async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({
            success: false,
            message: 'id is required',
        });
    }

    if (!isValidInteger(req.params.id)) {
        res.status(400).json({
            success: false,
            message: 'id must be interger',
        });
        return;
    }

    const query = `SELECT * FROM ${TABLE_NAMES.users} WHERE id = ?`;

    const users = await selectData(query, [req.params.id]);

    if (users.length === 0) {
        res.status(404).json({
            success: false,
            message: 'User not found!',
        });
        return;
    }

    const { password, ...newUser } = users[0];
    newUser.birthday = convertDateToGMT7(newUser.birthday);
    newUser.created_at = convertTimeToGMT7(newUser.created_at);

    res.status(200).json({
        success: true,
        message: 'Find user successfully!',
        data: newUser,
    });
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
            return res.status(400).json({
                success: false,
                message: `Missing required field: ${field}`,
            });
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
        res.status(409).json({
            success: false,
            message: 'This username already exists!',
        });
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
        res.status(500).json({
            success: false,
            message: 'Somthing went wrongs!',
        });

        return;
    }

    res.status(200).json({
        success: true,
        message: 'Created account successfully!',
    });
};

const updateUser = async (req, res) => {
    if (!req.params.id) {
        res.status(400).json({
            success: false,
            message: 'id is required',
        });
        return;
    }

    if (!isValidInteger(req.params.id)) {
        res.status(400).json({
            success: false,
            message: 'id must be interger',
        });
        return;
    }

    /**FIND USER */
    const findUserQuery = `SELECT * FROM ${TABLE_NAMES.users} WHERE id = ?`;
    const usersFound = await selectData(findUserQuery, [req.params.id]);

    if (usersFound.length === 0) {
        res.status(404).json({
            success: false,
            message: 'User not found!',
        });
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
                res.status(400).json({
                    success: false,
                    message: 'password connot empty',
                });
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
        res.status(400).json({
            success: false,
            message: 'No fields to update',
        });
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
            return res.status(500).json({
                success: false,
                message: 'Cannot update user info at this time!',
            });
        }

        const querySelect = `SELECT * FROM ${TABLE_NAMES.users} WHERE id = ?`;
        const updatedUsers = await selectData(querySelect, [req.params.id]);

        const { password, ...otherUserInfo } = updatedUsers[0];
        otherUserInfo.created_at = convertTimeToGMT7(otherUserInfo.created_at);
        otherUserInfo.birthday = convertDateToGMT7(otherUserInfo.birthday);

        res.status(200).json({
            success: true,
            message: 'Updated user info successfully!',
            data: otherUserInfo,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'something went wrongs!',
        });
    }
};

const deleteUser = async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({
            success: false,
            message: 'id is required',
        });
    }

    if (!isValidInteger(req.params.id)) {
        res.status(400).json({
            success: false,
            message: 'id must be interger',
        });
        return;
    }

    /**FIND USER */
    const findUserQuery = `SELECT * FROM ${TABLE_NAMES.users} WHERE id = ?`;
    const usersFound = await selectData(findUserQuery, [req.params.id]);

    if (usersFound.length === 0) {
        res.status(404).json({
            success: false,
            message: 'User not found!',
        });
        return;
    }

    /**DELETE USER */
    const deleteQuery = `DELETE FROM ${TABLE_NAMES.users} WHERE id = ?`;
    const result = await excuteQuery(deleteQuery, [req.params.id]);

    if (!result) {
        res.status(500).json({
            success: false,
            message: 'Somthing went wrongs!',
        });

        return;
    }

    res.status(200).json({
        success: true,
        message: 'Deleted account successfully!',
    });
};

const adminUserControllers = {
    getUserById,
    createUser,
    deleteUser,
    updateUser,
};

module.exports = adminUserControllers;
