const jwt = require('jsonwebtoken');

const {
    TABLE_NAMES,
    USER_ROLES,
    ACCOUNT_STATE,
} = require('@/src/configs/constants.config');
const {
    QUERY_SELECT_USER_BY_USERNAME,
} = require('@/src/configs/queries.config');
const { STATUS_CODE } = require('@/src/configs/status.codes.config');

const {
    selectData,
    comparePassWord,
    hashPassWord,
    excuteQuery,
    getCurrentTimeInGMT7,
    convertTimeToGMT7,
    convertDateToGMT7,
    generateJWT,
    sendResponse,
    isValidEmail,
} = require('@/src/ultil/ultil.lib');
const { sendMail } = require('../services/mailsender.service');

const webUrl = process.env.WEB_URL;

const register = async (req, res) => {
    try {
        const requiredFields = [
            'username',
            'password',
            'firstname',
            'lastname',
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

        /* FIND USER */

        const selectQuery = `
            SELECT id FROM ${TABLE_NAMES.users} WHERE username = ?
        `;

        const users = await selectData(selectQuery, [req.body.username]);

        if (users.length > 0) {
            sendResponse(
                res,
                STATUS_CODE.CONFLICT,
                'This username already exists!'
            );
            return;
        }

        /* CREATE USER */

        const fields = requiredFields.map((field) => ` ${field}`);

        const insertQuery = `INSERT INTO ${TABLE_NAMES.users} (${fields}, role, created_at, active) VALUES (?, ?, ?, ?, ?, ?, ?, '${ACCOUNT_STATE.active}')`;

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
            sendResponse(
                res,
                STATUS_CODE.INTERNAL_SERVER_ERROR,
                'cannot create account at this time!'
            );

            return;
        }

        sendResponse(res, STATUS_CODE.OK, 'Created account successfully!');
    } catch (error) {
        console.log(error);
        sendResponse(
            res,
            STATUS_CODE.INTERNAL_SERVER_ERROR,
            'something went wrong!' + error
        );
    }
};

const signin = async (req, res) => {
    try {
        const inputUsername = req.body.username;
        const inputPassword = req.body.password;

        if (!inputUsername) {
            sendResponse(res, STATUS_CODE.BAD_REQUEST, 'Missing username');
            return;
        }

        if (!inputPassword) {
            sendResponse(res, STATUS_CODE.BAD_REQUEST, 'Missing password');
            return;
        }

        const query = QUERY_SELECT_USER_BY_USERNAME;

        const users = await selectData(query, [inputUsername]);

        if (users.length === 0) {
            sendResponse(
                res,
                STATUS_CODE.NOT_FOUND,
                'Wrong username or password'
            );

            return;
        }

        const result = await comparePassWord(inputPassword, users[0].password);

        if (!result) {
            sendResponse(
                res,
                STATUS_CODE.NOT_FOUND,
                'Wrong username or password'
            );

            return;
        }

        if (users[0].active == ACCOUNT_STATE.deactive) {
            sendResponse(
                res,
                STATUS_CODE.FORBIDDEN,
                'This account has been deactivated!'
            );
            return;
        }

        const {
            // eslint-disable-next-line no-unused-vars
            password,
            address_id,
            address_latitude,
            address_longitude,
            place_id,
            address_name,
            full_address,

            ...other
        } = users[0];

        other.created_at = convertTimeToGMT7(other.created_at);
        other.birthday = convertDateToGMT7(other.birthday);

        other.address =
            address_id === null
                ? null
                : {
                      id: address_id,
                      latitude: address_latitude,
                      longitude: address_longitude,
                      place_id: place_id,
                      address_name: address_name,
                      full_address: full_address,
                  };

        const token = generateJWT({
            user_id: users[0].id,
            username: inputUsername,
            role: other.role,
        });

        res.cookie('token', token, {
            httpOnly: true,
            path: '/',
            sameSite: 'strict',
        });

        res.status(STATUS_CODE.OK).json({
            success: true,
            message: 'Sign in successfully!',
            token: token,
            data: other,
        });
    } catch (error) {
        sendResponse(res, STATUS_CODE.INTERNAL_SERVER_ERROR, error);
    }
};

const staffSignin = async (req, res) => {
    try {
        const inputUsername = req.body.username;
        const inputPassword = req.body.password;

        if (!inputUsername) {
            sendResponse(res, STATUS_CODE.BAD_REQUEST, 'Missing username');
            return;
        }

        if (!inputPassword) {
            sendResponse(res, STATUS_CODE.BAD_REQUEST, 'Missing password');
            return;
        }

        const queryFindStaff = `
            SELECT
                stf.*,
                ss.id AS station_id,
                ss.name AS station_name
            FROM ${TABLE_NAMES.staffs} AS stf
            JOIN ${TABLE_NAMES.service_stations} AS ss
                ON stf.station_id = ss.id
            WHERE username = ?
        `;

        const staffs = await selectData(queryFindStaff, [inputUsername]);

        if (staffs.length == 0) {
            sendResponse(
                res,
                STATUS_CODE.NOT_FOUND,
                'Wrong username or password'
            );

            return;
        }
        const result = await comparePassWord(inputPassword, staffs[0].password);

        if (!result) {
            sendResponse(
                res,
                STATUS_CODE.NOT_FOUND,
                'Wrong username or password'
            );

            return;
        }
        if (staffs[0].active === ACCOUNT_STATE.deactive) {
            sendResponse(
                res,
                STATUS_CODE.FORBIDDEN,
                'This account has been deactivated!'
            );
            return;
        }

        // eslint-disable-next-line no-unused-vars
        const { station_id, station_name, password, ...other } = staffs[0];

        other.created_at = convertTimeToGMT7(other.created_at);
        other.birthday = convertDateToGMT7(other.birthday);

        other.role = USER_ROLES.staff;
        other.station = {
            id: station_id,
            name: station_name,
        };

        const token = generateJWT({
            user_id: staffs[0].id,
            username: inputUsername,
            role: USER_ROLES.staff,
        });

        res.status(STATUS_CODE.OK).json({
            success: true,
            message: 'Sign in successfully!',
            token: token,
            data: other,
        });
        return;
    } catch (error) {
        sendResponse(res, STATUS_CODE.INTERNAL_SERVER_ERROR, error);
    }
};

const userForgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            sendResponse(res, STATUS_CODE.BAD_REQUEST, 'Missing email');
            return;
        }

        if (!isValidEmail(email)) {
            sendResponse(res, STATUS_CODE.BAD_REQUEST, 'Invalid email');
            return;
        }

        const users = await selectData(
            `SELECT * FROM ${TABLE_NAMES.users} WHERE email = ?`,
            [email]
        );

        if (users.length === 0) {
            sendResponse(res, STATUS_CODE.NOT_FOUND, 'Email not found');
            return;
        }

        const token = await generateJWT(
            {
                email: email,
            },
            '5m'
        );

        const emailHTML = `
            <!doctype html>
            <html>
                <body style="font-family: Arial, sans-serif; background-color: #f4f4f9; margin: 0; padding: 0;">
                    <div style="max-width: 600px; margin: 20px auto; background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
                        <div style="text-align: center; background: #49a9ee; padding: 10px 0; color: #fff; font-size: 24px; border-radius: 8px 8px 0 0;">
                            Yêu cầu đặt lại mật khẩu
                        </div>
                        <div style="padding: 20px; ">
                            <p>Chào bạn,</p>
                            <p>
                                Bạn đã yêu cầu đặt lại mật khẩu cho tài khoản của mình. Để đặt lại mật khẩu, vui lòng nhập mã xác nhận sau đây:
                            </p>
                            <p style="text-align: center; font-size: 24px; color: #49a9ee; margin: 20px 0;">${webUrl + '/reset-password?token=' + token}</p>
                            <p>Best regards,</p>
                        </div>
                        <div style="text-align: center; margin-top: 20px; color: #777; font-size: 12px;">
                            Đây là email tự động, vui lòng không trả lời.
                        </div>
                    </div>
                </body>
            </html>
    `;

        // Gửi email
        await sendMail(email, 'Đặt lại mật khẩu', emailHTML);

        sendResponse(res, STATUS_CODE.OK, 'Email sent successfully!');
    } catch (error) {
        sendResponse(res, STATUS_CODE.INTERNAL_SERVER_ERROR, error);
    }
};

const userResetPassword = async (req, res) => {
    try {
        const { password, repassword, token } = req.body;

        if (!password || !repassword) {
            sendResponse(res, STATUS_CODE.BAD_REQUEST, 'Missing password');
            return;
        }

        if (!token) {
            sendResponse(res, STATUS_CODE.UNAUTHORIZED, 'Missing token');
            return;
        }

        if (password !== repassword) {
            sendResponse(
                res,
                STATUS_CODE.BAD_REQUEST,
                'Password and repassword are not the same'
            );
            return;
        }

        console.log(req.body);

        const accessToken = token.split(' ')[1];

        try {
            const payload = await jwt.verify(
                accessToken,
                process.env.JWT_ACCESS_TOKEN
            );

            const { email } = payload;

            const hashed = await hashPassWord(password);

            await excuteQuery('UPDATE users SET password = ? WHERE email = ?', [
                hashed,
                email,
            ]);

            sendResponse(res, STATUS_CODE.OK, 'password reset successfully');
            // eslint-disable-next-line no-unused-vars
        } catch (error) {
            sendResponse(
                res,
                STATUS_CODE.FORBIDDEN,
                'Token is not valid' + error
            );
        }

        // sendResponse(res, STATUS_CODE.OK, 'OTP is valid');
    } catch (error) {
        sendResponse(res, STATUS_CODE.INTERNAL_SERVER_ERROR, error.message);
    }
};

const authController = {
    signin,
    register,
    staffSignin,
    userForgotPassword,
    userResetPassword,
};

module.exports = authController;
