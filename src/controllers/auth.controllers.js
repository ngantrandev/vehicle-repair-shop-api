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
    const inputUsername = req.body.username;
    const inputPassword = req.body.password;
    const inputFirstName = req.body.firstname;
    const inputLastName = req.body.lastname;
    const inputBirthday = req.body.birthday;
    const inputEmail = req.body.email;
    const inputPhone = req.body.phone;

    if (
        !inputUsername ||
        !inputPassword ||
        !inputFirstName ||
        !inputLastName ||
        !inputBirthday ||
        !inputEmail ||
        !inputPhone
    ) {
        res.status(400).json({
            success: false,
            message: 'Missing value',
        });

        return;
    }

    const selectQuery = `
        SELECT * FROM ${TABLE_NAMES.users} WHERE username = ?
        UNION
        SELECT * FROM ${TABLE_NAMES.staffs} WHERE username = ?
    `;
    const users = await selectData(selectQuery, [inputUsername, inputUsername]);

    if (users.length > 0) {
        res.status(409).json({
            success: false,
            message: 'This username already exists!',
        });
        return;
    }

    const hashPassword = await hashPassWord(inputPassword);

    const insertQuery = `INSERT INTO ${TABLE_NAMES.users} VALUES (null, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const imageUrl = '';
    const role = USER_ROLES.customer;
    const address = null;
    const timeCreated = getCurrentTimeInGMT7();

    const result = await excuteQuery(insertQuery, [
        inputUsername,
        hashPassword,
        inputFirstName,
        inputLastName,
        inputBirthday,
        imageUrl,
        inputEmail,
        address,
        inputPhone,
        role,
        timeCreated,
    ]);

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
