const { TABLE_NAMES, ACCOUNT_STATE } = require('../configs/constants.config');
const { QUERY_SELECT_STAFF_BY_ID } = require('../configs/queries.config');
const {
    selectData,
    isValidInteger,
    convertDateToGMT7,
    convertTimeToGMT7,
    hashPassWord,
    getCurrentTimeInGMT7,
    excuteQuery,
} = require('../ultil.lib');

const getStaffById = async (req, res) => {
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

    const query = QUERY_SELECT_STAFF_BY_ID;

    const staffs = await selectData(query, [req.params.id]);

    if (staffs.length === 0) {
        res.status(404).json({
            success: false,
            message: 'Staff not found!',
        });
        return;
    }

    const { password, station_id, ...other } = staffs[0];
    other.birthday = convertDateToGMT7(other.birthday);
    other.created_at = convertTimeToGMT7(other.created_at);

    res.status(200).json({
        success: true,
        message: 'Find staff successfully!',
        data: other,
    });
};

const createStaff = async (req, res) => {
    const requiredFields = [
        'username',
        'password',
        'firstname',
        'lastname',
        'email',
        'station_id',
    ];

    for (const field of requiredFields) {
        if (!req.body[field]) {
            return res.status(400).json({
                success: false,
                message: `Missing required field: ${field}`,
            });
        }
    }

    /**VALIDATE VALUE */
    if (!isValidInteger(req.body.station_id)) {
        res.status(400).json({
            success: false,
            message: 'station id must be interger',
        });
        return;
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

    const insertedFields = [];
    const insertedValues = [];

    for (const field of requiredFields) {
        const value = req.body[field];

        if (field === 'password') {
            const hash = await hashPassWord(value);
            insertedValues.push(hash);
        } else {
            insertedValues.push(value);
        }

        insertedFields.push(`${field} `);
    }

    const queryCreate = `INSERT INTO ${TABLE_NAMES.staffs} (${insertedFields}, created_at, active) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    // add time created
    insertedValues.push(getCurrentTimeInGMT7());
    // set account state: active state
    insertedValues.push(ACCOUNT_STATE.active);

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
        message: 'Created staff account successfully!',
    });
};

const updateStaff = async (req, res) => {
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
    const findStaffQuery = `
        SELECT * FROM ${TABLE_NAMES.staffs} WHERE id = ?
    `;
    const staffsFound = await selectData(findStaffQuery, [req.params.id]);

    if (staffsFound.length === 0) {
        res.status(404).json({
            success: false,
            message: 'Staff not found!',
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
        'station_id',
        'active',
    ];

    const updateFields = [];
    const updateValues = [];

    for (const field of possibleFields) {
        if (!req.body[field]) {
            continue;
        }

        if (field === 'username') {
            if (await isUsernameExist(req.body[field], req.params.id)) {
                res.status(409).json({
                    success: false,
                    message: 'username already exist!',
                });
                return;
            }

            updateFields.push(`${field} = ?`);
            updateValues.push(req.body[field]);
        } else if (field === 'password') {
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
            UPDATE ${TABLE_NAMES.staffs}
            SET ${updateFields}
            WHERE id = ?
        `;

        const result = await excuteQuery(updateQuery, [
            ...updateValues,
            req.params.id,
        ]);

        if (!result) {
            return res.status(500).json({
                success: false,
                message: 'Cannot update staff info at this time!',
            });
        }

        const querySelect = QUERY_SELECT_STAFF_BY_ID;
        const updatedStaffs = await selectData(querySelect, [req.params.id]);

        const { password, station_id, ...other } = updatedStaffs[0];
        other.created_at = convertTimeToGMT7(other.created_at);
        other.birthday = convertDateToGMT7(other.birthday);

        res.status(200).json({
            success: true,
            message: 'Updated user info successfully!',
            data: other,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'something went wrongs!',
        });
    }
};

const deleteStaff = async (req, res) => {
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

    /**DELETE USER */
    const deleteQuery = `DELETE FROM ${TABLE_NAMES.staffs} WHERE id = ?`;
    const result = await excuteQuery(deleteQuery, [req.params.id]);

    if (!result) {
        res.status(500).json({
            success: false,
            message: 'Somthing went wrongs!',
        });

        return;
    } else if (result.affectedRows === 0) {
        res.status(404).json({
            success: false,
            message: 'Staff not found!',
        });

        return;
    }

    res.status(200).json({
        success: true,
        message: 'Deleted staff account successfully!',
    });
};

const isUsernameExist = async (username, id) => {
    /**FIND USERNAME EXIST */
    const query = `
        SELECT * FROM ${TABLE_NAMES.users} WHERE username = ?
        UNION
        SELECT * FROM ${TABLE_NAMES.staffs} WHERE username = ? AND id != ?
    `;

    const staffsFound = await selectData(query, [username, username, id]);

    if (staffsFound.length > 0) {
        return true;
    }

    return false;
};

const adminStaffController = {
    getStaffById,
    createStaff,
    updateStaff,
    deleteStaff,
};

module.exports = adminStaffController;
