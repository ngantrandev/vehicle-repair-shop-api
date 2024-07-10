const {
    TABLE_NAMES,
    USER_ROLES,
    ACCOUNT_STATE,
} = require('../configs/constants.config');
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
    UNION
    SELECT id FROM ${TABLE_NAMES.staffs} WHERE username = ?;
`;

        const users = await selectData(selectQuery, [
            req.body.username,
            req.body.username,
        ]);

        console.log('sdfsdf');
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
        sendResponse(
            res,
            STATUS_CODE.INTERNAL_SERVER_ERROR,
            'something went wrong!'
        );
    }
};

const signin = async (req, res) => {
    try {
        const inputUsername = req.body.username;
        const inputPassword = req.body.password;

        if (!inputUsername || !inputPassword) {
            sendResponse(res, STATUS_CODE.BAD_REQUEST, 'Missing value');

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

        // staffs length > 0 => user is a staff
        if (staffs.length > 0) {
            const result = await comparePassWord(
                inputPassword,
                staffs[0].password
            );

            if (result) {
                // correct password but account is deactivated
                if (staffs[0].active === ACCOUNT_STATE.deactive) {
                    sendResponse(
                        res,
                        STATUS_CODE.FORBIDDEN,
                        'This account has been deactivated!'
                    );
                    return;
                }

                const { station_id, station_name, password, ...other } =
                    staffs[0];

                other.created_at = convertTimeToGMT7(other.created_at);
                other.birthday = convertDateToGMT7(other.birthday);

                other.station = {
                    id: station_id,
                    name: station_name,
                };

                const token = generateJWT(inputUsername, USER_ROLES.staff);

                res.status(STATUS_CODE.OK).json({
                    success: true,
                    message: 'Sign in successfully!',
                    token: token,
                    data: other,
                });
                return;
            }
        }

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
            WHERE u.username = ?`;

        console.log(query);

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

        const token = generateJWT(inputUsername, other.role);

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

const authController = { signin, register };

module.exports = authController;
