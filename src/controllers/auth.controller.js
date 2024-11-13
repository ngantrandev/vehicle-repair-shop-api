const {
    TABLE_NAMES,
    USER_ROLES,
    ACCOUNT_STATE,
} = require('../configs/constants.config');
const { QUERY_SELECT_USER_BY_USERNAME } = require('../configs/queries.config');
const { STATUS_CODE } = require('../configs/status.codes.config');
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
} = require('../ultil/ultil.lib');

const register = async (req, res) => {
    const requiredFields = [
        'username',
        'password',
        'firstname',
        'lastname',
        'phone',
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

    try {
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

        const insertQuery = `INSERT INTO ${TABLE_NAMES.users} (${fields}, role, created_at, active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, '${ACCOUNT_STATE.active}')`;

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

        const token = generateJWT(users[0].id, inputUsername, other.role);

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

        const { station_id, station_name, password, ...other } = staffs[0];

        other.created_at = convertTimeToGMT7(other.created_at);
        other.birthday = convertDateToGMT7(other.birthday);

        other.role = USER_ROLES.staff;
        other.station = {
            id: station_id,
            name: station_name,
        };

        const token = generateJWT(
            staffs[0].id,
            inputUsername,
            USER_ROLES.staff
        );

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

const authController = { signin, register, staffSignin };

module.exports = authController;
