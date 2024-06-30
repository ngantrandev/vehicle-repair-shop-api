const { TABLE_NAMES, USER_ROLES } = require('../configs/constants.config');
const {
    selectData,
    comparePassWord,
    hashPassWord,
    excuteQuery,
    getCurrentTimeInGMT7,
    convertTimeToGMT7,
    convertDateToGMT7,
    generateJWT,
} = require('../ultil.lib');

const register = async (req, res) => {
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

    /* FIND USER */

    const selectQuery = `
        SELECT * FROM ${TABLE_NAMES.users} WHERE username = ?
        UNION
        SELECT * FROM ${TABLE_NAMES.staffs} WHERE username = ?
    `;
    const users = await selectData(selectQuery, [
        req.body.username,
        req.body.username,
    ]);

    if (users.length > 0) {
        res.status(409).json({
            success: false,
            message: 'This username already exists!',
        });
        return;
    }

    /* CREATE USER */

    const fields = requiredFields.map((field) => ` ${field}`);

    const insertQuery = `INSERT INTO ${TABLE_NAMES.users} (${fields}, role, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)`;

    const values = [];

    for (const field of requiredFields) {
        const value = req.body[field];
        if (field === 'password') {
            const hash = await hashPassWord(value);
            values.push(hash);
        } else {
            values.push(value);
        }
    }

    // add role value
    values.push(USER_ROLES.customer);
    // add time created account
    values.push(getCurrentTimeInGMT7());

    const result = await excuteQuery(insertQuery, values);

    if (!result) {
        res.status(500).json({
            success: false,
            message: 'cannot create account at this time!',
        });

        return;
    }

    res.status(200).json({
        success: true,
        message: 'Created account successfully!',
    });
};

const signin = async (req, res) => {
    try {
        const inputUsername = req.body.username;
        const inputPassword = req.body.password;

        if (!inputUsername || !inputPassword) {
            res.status(400).json({
                success: false,
                message: 'Missing value',
            });

            return;
        }

        const queryFindStaff = `
        SELECT ${TABLE_NAMES.staffs}.*, ${TABLE_NAMES.service_stations}.name AS service_station_name, ${TABLE_NAMES.service_stations}.address AS service_station_adress
            FROM ${TABLE_NAMES.staffs}
            JOIN ${TABLE_NAMES.service_stations}
            ON ${TABLE_NAMES.staffs}.station_id = ${TABLE_NAMES.service_stations}.id
            WHERE username = ?
        `;

        const staffs = await selectData(queryFindStaff, [inputUsername]);

        // staffs length > 0 => user is a staff
        if (staffs.length > 0) {
            const result = await comparePassWord(
                inputPassword,
                staffs[0].password
            );

            if (result) {
                const { password, ...newStaffInfo } = staffs[0];

                newStaffInfo.created_at = convertTimeToGMT7(
                    newStaffInfo.created_at
                );
                newStaffInfo.birthday = convertDateToGMT7(
                    newStaffInfo.birthday
                );

                const token = generateJWT(inputUsername, USER_ROLES.staff);

                res.status(200).json({
                    success: true,
                    message: 'Sign in successfully!',
                    token: token,
                    data: newStaffInfo,
                });
                return;
            }
        }

        const query = `SELECT * FROM ${TABLE_NAMES.users} WHERE username = ?`;

        const users = await selectData(query, [inputUsername]);

        if (users.length === 0) {
            res.status(404).json({
                success: false,
                message: 'Wrong username or password',
            });

            return;
        }

        const result = await comparePassWord(inputPassword, users[0].password);

        if (!result) {
            res.status(404).json({
                success: false,
                message: 'Wrong username or password',
            });

            return;
        }

        const { password, ...newUserInfo } = users[0];

        newUserInfo.created_at = convertTimeToGMT7(newUserInfo.created_at);
        newUserInfo.birthday = convertDateToGMT7(newUserInfo.birthday);

        const token = generateJWT(inputUsername, newUserInfo.role);

        res.status(200).json({
            success: true,
            message: 'Sign in successfully!',
            token: token,
            data: newUserInfo,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error,
        });
    }
};

const authController = { signin, register };

module.exports = authController;