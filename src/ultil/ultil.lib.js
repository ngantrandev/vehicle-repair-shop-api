const bcrypt = require('bcrypt');
const moment = require('moment-timezone');
const jwt = require('jsonwebtoken');
const polyline = require('@mapbox/polyline');
const crypto = require('crypto');

const pool = require('@/src/configs/db.config');
const {
    BOOKING_STATE,
    TABLE_NAMES,
    ACCOUNT_STATE,
} = require('@/src/configs/constants.config');
const goongServices = require('@/src/services/goongServices');
const { STATUS_CODE } = require('@/src/configs/status.codes.config');

const SecretKey = process.env.VNP_SECRET_KEY || '';

const executeTransaction = async (queries, listParamArray) => {
    if (queries.length !== listParamArray.length) {
        throw new Error(
            'PAY ATTENTION Queries length must equal to listParamArray length!!!!'
        );
    }

    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                return reject(err);
            }

            // Bắt đầu giao dịch
            connection.beginTransaction(async (err) => {
                if (err) {
                    connection.release(); // Giải phóng kết nối khi có lỗi
                    return reject(err);
                }

                try {
                    const results = [];

                    for (let i = 0; i < queries.length; i++) {
                        const result = await new Promise((resolve, reject) => {
                            connection.query(
                                queries[i],
                                listParamArray[i],
                                (error, result) => {
                                    if (error) {
                                        return reject(error);
                                    }
                                    resolve(result);
                                }
                            );
                        });
                        results.push(result);
                    }

                    // Commit giao dịch
                    connection.commit((err) => {
                        if (err) {
                            connection.rollback(() => {
                                connection.release();
                                reject(err);
                            });
                            return;
                        }
                        connection.release(); // Giải phóng kết nối sau khi commit thành công
                        resolve(results);
                    });
                } catch (err) {
                    // Rollback nếu có lỗi
                    connection.rollback(() => {
                        connection.release();
                        reject(err);
                    });
                }
            });
        });
    });
};

const excuteQuery = async (query, listPagrams) => {
    return new Promise((resolve, reject) => {
        if (!pool || pool.state === 'disconnected') {
            throw new Error('Không thể kết nối đến cơ sở dữ liệu');
        }

        pool.query(query, listPagrams, function (error, results) {
            if (error) reject(error);
            resolve(results);
        });
    });
};

const selectData = async (query, listParams = []) => {
    return new Promise((resolve, reject) => {
        pool.query(query, listParams, (error, results) => {
            if (error) {
                reject(error); // throw lỗi nếu query thất bại
            } else {
                let payload = parseToJSONFrDB(results);
                resolve(payload);
            }
        });
    });
};

const hashPassWord = async (password) => {
    const saltRounds = 10;

    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);

    return hash;
};

const comparePassWord = async (password, hash) => {
    const result = await bcrypt.compare(password, hash);

    return result;
};

var parseToJSONFrDB = function (a) {
    return JSON.parse(JSON.stringify(a));
};

const getCurrentTimeInGMT7 = (format = 'YYYY-MM-DD HH:mm:ss') => {
    if (!format) {
        format = 'YYYY-MM-DD HH:mm:ss';
    }
    console.log('format', format);
    return moment.tz('Asia/Bangkok').format(format);
};

const convertTimeToGMT7 = (time) => {
    const localDateTime = moment.utc(time).tz('Asia/Bangkok');

    return localDateTime.format('YYYY-MM-DD HH:mm:ss');
};

const convertDateToGMT7 = (date) => {
    const localDate = moment.utc(date).tz('Asia/Bangkok');
    return localDate.format('YYYY-MM-DD');
};

const generateJWT = (userId, username, role) => {
    const tokent = jwt.sign(
        {
            user_id: userId,
            username,
            role,
        },
        process.env.JWT_ACCESS_TOKEN,
        { expiresIn: process.env.EXPIRES_TIME_ACCESS_TOKEN }
    );

    return tokent;
};

const isValidInteger = (value) => {
    // const trimmedValue = value.trim();
    const trimmedValue = value.toString().trim();

    return (
        !isNaN(trimmedValue) &&
        Number.isInteger(Number(trimmedValue)) &&
        trimmedValue.length > 0
    );
};

const isValidDouble = (value) => {
    // const trimmedValue = value.trim();
    const trimmedValue = value.toString().trim();

    return !isNaN(trimmedValue) && trimmedValue.length > 0;
};

const isValidTime = (time) => {
    return (
        moment(time, 'HH:mm', true).isValid() ||
        moment(time, 'HH:mm:ss', true).isValid()
    );
};

const sendResponse = (res, statusCode, message, data) => {
    if (!isValidInteger(statusCode)) {
        throw new Error('statusCode must be integer');
    }

    if (statusCode != STATUS_CODE.OK) {
        res.status(statusCode).json({
            success: false,
            message,
        });
    } else {
        res.status(statusCode).json({
            success: true,
            message,
            ...(data != null && { data }),
        });
    }
};

const getIdOfNearestStation = async (latitude, longitude) => {
    if (!latitude || !longitude) {
        return null;
    }

    // find nearest station if latitude and longitude not null
    const query = `SELECT
        ss.id AS station_id,
        addr.latitude,
        addr.longitude
                
        FROM ${TABLE_NAMES.service_stations} AS ss
        JOIN ${TABLE_NAMES.addresses} AS addr
        ON ss.address_id = addr.id
        WHERE addr.latitude IS NOT NULL AND addr.longitude IS NOT NULL
    `;

    const stations = await selectData(query, []);

    if (stations.length === 0) {
        return null;
    }

    const destinations = stations.map((station) => [
        [station.latitude, station.longitude],
    ]);

    const distanceMatrix =
        await goongServices.getDistanceMatrixFromUserAddrToOtherStations(
            [[latitude, longitude]],
            destinations
        );

    if (!distanceMatrix) {
        return null;
    }

    const data = distanceMatrix.rows[0].elements;

    // find nearest station
    let minDistance = data[0].distance.value;
    let stationId = stations[0].station_id;

    data.forEach((item, index) => {
        if (item.distance.value < minDistance) {
            minDistance = item.distance.value;
            stationId = stations[index].station_id;
        }
    });

    return stationId;
};

const getIdOfTheMostFreeStaff = async (stationId) => {
    // get staffid and booking with state = 'pending', 'accepted', 'fixing'

    if (!stationId || !isValidInteger(stationId)) {
        return null;
    }

    const query = `
        SELECT
            stf.id AS staff_id,
            COUNT(b.id) AS total_bookings
        FROM ${TABLE_NAMES.staffs} as stf
        JOIN
            ${TABLE_NAMES.service_stations} as ss
            ON ss.id = stf.station_id
        LEFT JOIN
            ${TABLE_NAMES.bookings} AS b
            ON b.staff_id = stf.id
            AND (
                b.status = '${BOOKING_STATE.pending}'
                OR b.status = '${BOOKING_STATE.accepted}'
                OR b.status = '${BOOKING_STATE.fixing}'
            )

        WHERE ss.id = ${stationId} AND stf.active = ${ACCOUNT_STATE.active}
        
        GROUP BY stf.id
    `;

    const data = await selectData(query, []);

    if (data.length === 0) return null;

    // init value
    let staffId = data[0].staff_id;
    let totalBookings = data[0].total_bookings;

    // find userId with smallest bookings
    data.forEach((item) => {
        if (item.total_bookings < totalBookings) {
            totalBookings = item.total_bookings;
            staffId = item.staff_id;
        }
    });

    return staffId;
};

/**
 *
 * @param {*} str example {x`aA{{wiSo@HsARY{AUD
 * @returns
 */
const decodePolyline = (str) => {
    return polyline.decode(str).map(([lat, lng]) => [lng, lat]);
};

const isValidDate = (date) => {
    return moment(date, 'YYYY-MM-DD', true).isValid();
};

const isValidUrl = (url) => {
    try {
        new URL(url); // Kiểm tra xem URL có hợp lệ không
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};

const sortObject = (obj) => {
    const sortedKeys = Object.keys(obj).sort(); // Sắp xếp key theo thứ tự tăng dần
    const sortedObj = {};
    sortedKeys.forEach((key) => {
        sortedObj[key] = obj[key]; // Gán giá trị vào object mới theo thứ tự key đã sắp xếp
    });
    return sortedObj;
};

// Hàm thay thế qs.stringify
const buildQueryParams = (data) => {
    const searchParams = new URLSearchParams();
    const sortedEntries = Object.entries(data).sort(([key1], [key2]) =>
        key1.localeCompare(key2)
    );

    for (const [key, value] of sortedEntries) {
        if (value !== '' && value !== undefined && value !== null) {
            searchParams.append(key, value.toString());
        }
    }
    return searchParams;
};

const getChecksum = (data) => {
    // Tính toán Secure Hash
    const hmac = crypto.createHmac('sha512', SecretKey);
    const signed = hmac.update(Buffer.from(data, 'utf-8')).digest('hex');

    return signed;
};

const convertTimeFormat = (time, currFormat, targetFormat) => {
    return moment(time, currFormat).format(targetFormat);
};

module.exports = {
    executeTransaction,
    excuteQuery,
    selectData,
    hashPassWord,
    comparePassWord,
    getCurrentTimeInGMT7,
    convertTimeToGMT7,
    convertDateToGMT7,
    generateJWT,
    isValidInteger,
    isValidTime,
    sendResponse,
    isValidDouble,
    getIdOfNearestStation,
    getIdOfTheMostFreeStaff,
    decodePolyline,
    isValidDate,
    isValidUrl,
    sortObject,
    buildQueryParams,
    getChecksum,
    convertTimeFormat,
};
