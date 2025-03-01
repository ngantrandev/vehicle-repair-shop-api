import path from 'path';
import sharp from 'sharp';

import { CustomRequest } from '@/src/types/requests';
import { Response } from 'express';

import { TABLE_NAMES } from '@/src/configs/constants.config';
import { STATUS_CODE } from '@/src/configs/status.codes.config';
import {
    sendResponse,
    selectData,
    excuteQuery,
    isValidInteger,
    convertTimeToGMT7,
    convertDateToGMT7,
    hashPassWord,
} from '@/src/ultil/ultil.lib';
import { QUERY_SELECT_USER_BY_USERNAME } from '@/src/configs/queries.config';
import { UserResponse } from '@/src/types/responses';

export const getUserByUsername = async (req: CustomRequest, res: Response) => {
    if (!req.params.username) {
        sendResponse(
            res,
            STATUS_CODE.BAD_REQUEST,
            'Missing username in params!'
        );
        return;
    }

    try {
        const query = QUERY_SELECT_USER_BY_USERNAME;

        const users: UserResponse[] = (await selectData(query, [
            req.params.username,
        ])) as UserResponse[];

        const {
            password,
            address_id,
            address_latitude,
            address_longitude,
            address_name,
            full_address,
            place_id,

            ...other
        } = users[0];

        other.created_at = convertTimeToGMT7(other.created_at);
        other.birthday = convertDateToGMT7(other.birthday);

        if (address_id) {
            other.address = {
                id: address_id,
                latitude: address_latitude,
                longitude: address_longitude,
                address_name,
                full_address,
                place_id,
            };
        }

        sendResponse(
            res,
            STATUS_CODE.OK,
            'Get user by username successfully!',
            other
        );
    } catch (error) {
        sendResponse(
            res,
            STATUS_CODE.INTERNAL_SERVER_ERROR,
            'Cannot get user by username at this time!' + error
        );
    }
};

export const updateUserProfile = async (req: CustomRequest, res: Response) => {
    try {
        if (!req.params.user_id) {
            sendResponse(
                res,
                STATUS_CODE.BAD_REQUEST,
                'Missing user_id in params!'
            );
            return;
        }

        if (!isValidInteger(req.params.user_id)) {
            sendResponse(
                res,
                STATUS_CODE.BAD_REQUEST,
                'user_id must be an integer!'
            );

            return;
        }
        const requiredFields = [
            'username',
            'firstname',
            'lastname',
            'birthday',
            'email',
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

        const updateFields = [];
        const updateValues = [];

        for (const field of requiredFields) {
            const value = req.body[field];
            if (field === 'username') {
                // find username existed
                const usernameQuery = `SELECT * FROM ${TABLE_NAMES.users} WHERE username = ? AND id != ?`;

                const usernameExisted: UserResponse[] = (await selectData(
                    usernameQuery,
                    [req.body.username, req.params.user_id]
                )) as UserResponse[];

                if (usernameExisted.length > 0) {
                    sendResponse(
                        res,
                        STATUS_CODE.CONFLICT,
                        'Username already existed!'
                    );
                    return;
                }

                updateFields.push(`${field} = ?`);
                updateValues.push(req.body[field]);
            } else if (field == 'email') {
                const emailQuery = `SELECT * FROM ${TABLE_NAMES.users} WHERE email = ? AND id != ?`;
                const emailExisted: UserResponse[] = (await selectData(
                    emailQuery,
                    [req.body.email, req.params.user_id]
                )) as UserResponse[];

                if (emailExisted.length > 0) {
                    sendResponse(
                        res,
                        STATUS_CODE.CONFLICT,
                        'Email already existed!'
                    );
                    return;
                }

                updateFields.push(`${field} = ?`);
                updateValues.push(req.body[field]);
            } else if (field === 'password') {
                const hash = await hashPassWord(value);

                updateFields.push(`${field} = ?`);
                updateValues.push(hash);
            } else {
                updateFields.push(`${field} = ?`);
                updateValues.push(req.body[field]);
            }
        }

        let fileName = '';
        let relativePath = ''; /** path from root dir to image */

        if (req.file) {
            const buffer = req.file.buffer;
            fileName = Date.now() + '.webp';
            relativePath = path.join('./uploads', fileName);

            try {
                await sharp(buffer).webp({ quality: 20 }).toFile(relativePath);

                updateFields.push('image_url = ?');
                updateValues.push(relativePath);
            } catch (error) {
                sendResponse(
                    res,
                    STATUS_CODE.INTERNAL_SERVER_ERROR,
                    'cannot update user info at this time' + error
                );
                return;
            }
        }

        if (updateFields.length === 0) {
            sendResponse(res, STATUS_CODE.BAD_REQUEST, 'No fields to update');
            return;
        }

        const updateQuery = `
            UPDATE ${TABLE_NAMES.users}
            SET ${updateFields}
            WHERE id = ?
        `;

        const result = await excuteQuery(updateQuery, [
            ...updateValues,
            req.params.user_id,
        ]);

        if (!result) {
            sendResponse(
                res,
                STATUS_CODE.INTERNAL_SERVER_ERROR,
                'Cannot update user info at this time!'
            );
            return;
        }

        sendResponse(res, STATUS_CODE.OK, 'Updated user profile successfully!');
    } catch (error) {
        sendResponse(
            res,
            STATUS_CODE.INTERNAL_SERVER_ERROR,
            'Cannot update user profile at this time!' + error
        );
    }
};
