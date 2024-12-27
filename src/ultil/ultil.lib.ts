const bcrypt = require('bcrypt');
const moment = require('moment-timezone');
const jwt = require('jsonwebtoken');
const polyline = require('@mapbox/polyline');
import crypto from 'crypto';
const fs = require('fs');
const axios = require('axios');
import { Response } from 'express';
import { MomentInput } from 'moment-timezone';
import os from 'os';

import pool from '@/src/configs/db.config';
const { STATUS_CODE } = require('@/src/configs/status.codes.config');

const SecretKey = process.env.VNP_SECRET_KEY || '';
const accessTokenSecret = process.env.JWT_ACCESS_TOKEN;
const expireTimeAccessToken = process.env.EXPIRES_TIME_ACCESS_TOKEN || '1h';

if (!accessTokenSecret) {
    throw new Error('Missing access token secret. check your .env file');
}

export const executeTransaction = async (
    queries: string[],
    listParamArray: any[]
) => {
    if (queries.length !== listParamArray.length) {
        throw new Error(
            'PAY ATTENTION Queries length must equal to listParamArray length!!!!'
        );
    }

    return new Promise((resolve, reject) => {
        pool.getConnection((err: NodeJS.ErrnoException, connection: any) => {
            if (err) {
                return reject(err);
            }

            // Bắt đầu giao dịch
            connection.beginTransaction(async (err: NodeJS.ErrnoException) => {
                if (err) {
                    connection.release(); // Giải phóng kết nối khi có lỗi
                    return reject(err);
                }

                try {
                    const results: any[] = [];

                    for (let i = 0; i < queries.length; i++) {
                        const result = await new Promise((resolve, reject) => {
                            connection.query(
                                queries[i],
                                listParamArray[i],
                                (error: NodeJS.ErrnoException, result: any) => {
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
                    connection.commit((err: NodeJS.ErrnoException) => {
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

export const excuteQuery = async (query: string, listPagrams: any[]) => {
    return new Promise((resolve, reject) => {
        if (!pool || pool.state === 'disconnected') {
            throw new Error('Không thể kết nối đến cơ sở dữ liệu');
        }

        pool.query(
            query,
            listPagrams,
            function (error: NodeJS.ErrnoException, results: any) {
                if (error) reject(error);
                resolve(results);
            }
        );
    });
};

export const selectData = async (query: string, listParams: any[] = []) => {
    return new Promise((resolve, reject) => {
        pool.query(
            query,
            listParams,
            (error: NodeJS.ErrnoException, results: any) => {
                if (error) {
                    reject(error); // throw lỗi nếu query thất bại
                } else {
                    let payload = parseToJSONFrDB(results);
                    resolve(payload);
                }
            }
        );
    });
};

export const hashPassWord = async (password: string) => {
    const saltRounds = 10;

    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);

    return hash;
};

export const comparePassWord = async (password: string, hash: string) => {
    const result = await bcrypt.compare(password, hash);

    return result;
};

export const parseToJSONFrDB = function (a: any) {
    return JSON.parse(JSON.stringify(a));
};

export const getCurrentTimeInGMT7 = (format = 'YYYY-MM-DD HH:mm:ss') => {
    if (!format) {
        format = 'YYYY-MM-DD HH:mm:ss';
    }
    return moment.tz('Asia/Bangkok').format(format);
};

export const convertTimeToGMT7 = (time: MomentInput) => {
    const localDateTime = moment.utc(time).tz('Asia/Bangkok');

    return localDateTime.format('YYYY-MM-DD HH:mm:ss');
};

export const convertDateToGMT7 = (date: MomentInput) => {
    const localDate = moment.utc(date).tz('Asia/Bangkok');
    return localDate.format('YYYY-MM-DD');
};

export const generateJWT = (
    data: object,
    expriresTime = expireTimeAccessToken
) => {
    const tokent = jwt.sign(
        {
            ...data,
        },
        accessTokenSecret,
        { expiresIn: expriresTime }
    );

    return tokent;
};

export const isValidInteger = (value: string) => {
    // const trimmedValue = value.trim();
    const trimmedValue = value.toString().trim();

    return (
        !isNaN(Number(trimmedValue)) &&
        Number.isInteger(Number(trimmedValue)) &&
        trimmedValue.length > 0
    );
};

export const isValidDouble = (value: string) => {
    // const trimmedValue = value.trim();
    const trimmedValue = value.toString().trim();

    return !isNaN(Number(trimmedValue)) && trimmedValue.length > 0;
};

export const isValidTime = (time: MomentInput) => {
    return (
        moment(time, 'HH:mm', true).isValid() ||
        moment(time, 'HH:mm:ss', true).isValid()
    );
};

export const sendResponse = (
    res: Response,
    statusCode: number,
    message: string,
    data: any
) => {
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

/**
 *
 * @param {*} str example {x`aA{{wiSo@HsARY{AUD
 * @returns
 */
export const decodePolyline = (str: string) => {
    return polyline
        .decode(str)
        .map(([lat, lng]: [number, number]) => [lng, lat]);
};

export const isValidDate = (date: string) => {
    return moment(date, 'YYYY-MM-DD', true).isValid();
};

export const isValidUrl = (url: string) => {
    try {
        new URL(url); // Kiểm tra xem URL có hợp lệ không
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};

export const sortObject = (obj: { [key: string]: any }) => {
    const sortedKeys = Object.keys(obj).sort(); // Sắp xếp key theo thứ tự tăng dần
    const sortedObj: { [key: string]: any } = {};
    sortedKeys.forEach((key) => {
        sortedObj[key] = obj[key]; // Gán giá trị vào object mới theo thứ tự key đã sắp xếp
    });
    return sortedObj;
};

// Hàm thay thế qs.stringify
export const buildQueryParams = (data: any) => {
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

export const getChecksum = (data: any) => {
    // Tính toán Secure Hash
    const hmac = crypto.createHmac('sha512', SecretKey);
    const signed = hmac.update(Buffer.from(data, 'utf-8')).digest('hex');

    return signed;
};

export const convertTimeFormat = (
    time: string,
    currFormat: string,
    targetFormat: string
) => {
    if (!targetFormat) {
        throw new Error('Target format is required');
    }
    if (!currFormat) {
        return moment(time).format(targetFormat);
    }
    return moment(time, currFormat).format(targetFormat);
};

export const isValidEmail = (email: string) => {
    return email
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

export const downloadFile = async (
    url: string | undefined,
    outputPath: string
) => {
    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });

        fs.writeFileSync(outputPath, Buffer.from(response.data));

        console.log('File downloaded successfully!');
    } catch (error) {
        console.error('Error downloading the file:', error);
    }
};

export const getDeviceIp = (): string => {
    let ip = '0.0.0.0';
    var ips = os.networkInterfaces();
    Object.keys(ips).forEach(function (_interface: string) {
        if (ips[_interface]) {
            ips[_interface].forEach(function (_dev: any) {
                if (_dev.family === 'IPv4' && !_dev.internal) ip = _dev.address;
            });
        }
    });

    return ip;
};
