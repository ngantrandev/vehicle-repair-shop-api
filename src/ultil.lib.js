const bcrypt = require('bcrypt');
const moment = require('moment-timezone');
const jwt = require('jsonwebtoken');

const connection = require('./configs/db.config');

const excuteQuery = async (query, listPagrams) => {
    return new Promise((resolve, reject) => {
        connection.query(query, listPagrams, function (error, results) {
            if (error) reject(error);
            resolve(results);
        });
    });
};

const selectData = async (query, listPagrams) => {
    return new Promise((resolve, reject) => {
        connection.query(query, listPagrams, function (error, results) {
            if (error) reject(error);
            let payload = [];
            payload = parseToJSONFrDB(results);
            resolve(payload);
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

const getCurrentTimeInGMT7 = () => {
    return moment.tz('Asia/Bangkok').format('YYYY-MM-DD HH:mm:ss');
};

const convertTimeToGMT7 = (time) => {
    const localDateTime = moment.utc(time).tz('Asia/Bangkok');

    return localDateTime.format('YYYY-MM-DD HH:mm:ss');
};

const convertDateToGMT7 = (date) => {
    const localDate = moment.utc(date).tz('Asia/Bangkok');
    return localDate.format('YYYY-MM-DD');
};

const generateJWT = (username, role) => {
    const tokent = jwt.sign(
        {
            username,
            role,
        },
        process.env.JWT_ACCESS_TOKEN,
        { expiresIn: '1d' }
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

const isValidTime = (time) => {
    return moment(time, 'HH:mm:ss', true).isValid();
};

const sendResponse = (res, statusCode, message, data) => {
    if (!isValidInteger(statusCode)) {
        throw new Error('statusCode must be integer');
    }

    if (statusCode != 200) {
        res.status(statusCode).json({
            success: false,
            message,
        });
    } else {
        res.status(statusCode).json({
            success: true,
            message,
            data,
        });
    }
};

module.exports = {
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
};
