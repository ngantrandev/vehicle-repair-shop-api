const { tableNames, userRoles } = require('../configs/constants.config');
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

    const selectQuery = `SELECT * FROM ${tableNames.users} WHERE username = ?`;
    const users = await selectData(selectQuery, [inputUsername]);

    if (users.length > 0) {
        res.status(409).json({
            success: false,
            message: 'This username already exists!',
        });
        return;
    }

    const hashPassword = await hashPassWord(inputPassword);

    const insertQuery = `INSERT INTO ${tableNames.users} VALUES (null, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const imageUrl = '';
    const role = userRoles.customer;
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

        const query = `SELECT * FROM ${tableNames.users} WHERE username = ?`;

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

        const token = generateJWT(inputUsername, newUserInfo.phone);

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
