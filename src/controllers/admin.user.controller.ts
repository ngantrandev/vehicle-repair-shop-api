import { Response } from 'express';
import { CustomRequest } from '@/src/types/requests';
import { UserResponse } from '@/src/types/responses';

import {
    TABLE_NAMES,
    USER_ROLES,
    ACCOUNT_STATE,
} from '@/src/configs/constants.config';
import { QUERY_SELECT_USER_BY_ID } from '@/src/configs/queries.config';
import { STATUS_CODE } from '@/src/configs/status.codes.config';
import {
    selectData,
    excuteQuery,
    convertDateToGMT7,
    convertTimeToGMT7,
    getCurrentTimeInGMT7,
    hashPassWord,
    isValidInteger,
    sendResponse,
} from '@/src/ultil/ultil.lib';

export const getUserById = async (req: CustomRequest, res: Response) => {
    if (!req.params.user_id) {
        sendResponse(res, STATUS_CODE.BAD_REQUEST, 'user_id is required');
        return;
    }

    if (!isValidInteger(req.params.user_id)) {
        sendResponse(res, STATUS_CODE.BAD_REQUEST, 'user_id must be interger');
        return;
    }

    try {
        const query = QUERY_SELECT_USER_BY_ID;

        const users: UserResponse[] = (await selectData(query, [
            req.params.user_id,
        ])) as UserResponse[];

        if (users.length === 0) {
            sendResponse(res, STATUS_CODE.NOT_FOUND, 'User not found!');
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
        other.birthday = convertDateToGMT7(other.birthday);
        other.created_at = convertTimeToGMT7(other.created_at);

        other.address = {
            id: address_id,
            latitude: address_latitude,
            longitude: address_longitude,
            place_id: place_id,
            address_name: address_name,
            full_address: full_address,
        };

        sendResponse(res, STATUS_CODE.OK, 'Find user successfullly!', other);
    } catch (error) {
        sendResponse(
            res,
            STATUS_CODE.INTERNAL_SERVER_ERROR,
            'something went wrongs!' + error
        );
    }
};

export const createUser = async (req: CustomRequest, res: Response) => {
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
        /* FIND USER*/

        const findQuery = `
            SELECT id FROM ${TABLE_NAMES.users} WHERE username = ?
            UNION
            SELECT id FROM ${TABLE_NAMES.staffs} WHERE username = ? 
        `;

        const usersExist: any[] = (await selectData(findQuery, [
            req.body.username,
            req.body.username,
        ])) as any[];

        if (usersExist.length > 0) {
            sendResponse(
                res,
                STATUS_CODE.CONFLICT,
                'This username already exists!'
            );
            return;
        }

        /** CREATE USER */

        const insertedFields = requiredFields.map((field) => ` ${field}`);

        const queryCreate = `INSERT INTO ${TABLE_NAMES.users} (${insertedFields}, role, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)`;

        const insertedValues = [];

        for (const field of requiredFields) {
            const value = req.body[field];
            if (field === 'password') {
                const hash = await hashPassWord(value);
                insertedValues.push(hash);
            } else {
                insertedValues.push(value);
            }
        }

        // add role value
        insertedValues.push(USER_ROLES.customer);
        // add time created
        insertedValues.push(getCurrentTimeInGMT7());

        const result = await excuteQuery(queryCreate, insertedValues);

        if (!result) {
            sendResponse(
                res,
                STATUS_CODE.INTERNAL_SERVER_ERROR,
                'Somthing went wrongs!'
            );

            return;
        }

        sendResponse(res, STATUS_CODE.OK, 'Created account successfully!');
    } catch (error) {
        sendResponse(
            res,
            STATUS_CODE.INTERNAL_SERVER_ERROR,
            'something went wrongs!' + error
        );
    }
};

export const updateUser = async (req: CustomRequest, res: Response) => {
    if (!req.params.user_id) {
        sendResponse(res, STATUS_CODE.BAD_REQUEST, 'user_id is required');
        return;
    }

    if (!isValidInteger(req.params.user_id)) {
        sendResponse(res, STATUS_CODE.BAD_REQUEST, 'user_id must be interger');
        return;
    }

    try {
        /**FIND USER */
        const checkExistQuery = `SELECT * FROM ${TABLE_NAMES.users} WHERE id = ?`;
        const usersFound: any[] = (await selectData(checkExistQuery, [
            req.params.user_id,
        ])) as any[];

        if (usersFound.length === 0) {
            sendResponse(res, STATUS_CODE.NOT_FOUND, 'User not found!');
            return;
        }

        if (req.body.username) {
            const checkExistUsernameQuery = `
                SELECT id FROM ${TABLE_NAMES.users} WHERE username = ? AND id != ?
                UNION
                SELECT id FROM ${TABLE_NAMES.staffs} WHERE username = ?
            `;
            const usersExist: any[] = (await selectData(
                checkExistUsernameQuery,
                [req.body.username, req.params.user_id, req.body.username]
            )) as any[];

            if (usersExist.length > 0) {
                sendResponse(
                    res,
                    STATUS_CODE.CONFLICT,
                    'This username already exists!'
                );
                return;
            }
        }

        const possibleFields = [
            'username',
            'password',
            'firstname',
            'lastname',
            'birthday',
            'image_file',
            'email',
            'address_id',
            'phone',
            'role',
            'active',
        ];

        const updateFields = [];
        const updateValues = [];

        for (const field of possibleFields) {
            if (!req.body[field]) {
                continue;
            }

            if (field === 'password') {
                if (req.body[field].trim().length === 0) {
                    sendResponse(
                        res,
                        STATUS_CODE.BAD_REQUEST,
                        'password connot empty'
                    );
                    return;
                }

                const hash = await hashPassWord(req.body[field]);
                updateFields.push(`${field} = ?`);
                updateValues.push(hash);
            } else if (field === 'image_file') {
                // save file
                // get file path
                // save path to field "image_url"
            } else {
                updateFields.push(`${field} = ?`);
                updateValues.push(req.body[field]);
            }
        }

        if (updateFields.length === 0) {
            sendResponse(res, STATUS_CODE.BAD_REQUEST, 'No fields to update');
            return;
        }
        const updateQuery = `
            UPDATE ${TABLE_NAMES.users}
            SET ${updateFields.join(', ')}
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

        sendResponse(res, STATUS_CODE.OK, 'Updated user info successfully!');
    } catch (error) {
        sendResponse(
            res,
            STATUS_CODE.INTERNAL_SERVER_ERROR,
            'something went wrongs!' + error
        );
    }
};

export const deactivateUser = async (req: CustomRequest, res: Response) => {
    if (!req.params.user_id) {
        sendResponse(res, STATUS_CODE.BAD_REQUEST, 'user_id is required');

        return;
    }

    if (!isValidInteger(req.params.user_id)) {
        sendResponse(res, STATUS_CODE.BAD_REQUEST, 'user_id must be interger');
        return;
    }

    try {
        /**FIND USER */
        const findUserQuery = `SELECT * FROM ${TABLE_NAMES.users} WHERE id = ?`;
        const usersFound: any[] = (await selectData(findUserQuery, [
            req.params.user_id,
        ])) as any[];

        if (usersFound.length === 0) {
            sendResponse(res, STATUS_CODE.NOT_FOUND, 'User not found!');
            return;
        }

        if (usersFound[0].role === USER_ROLES.admin) {
            sendResponse(
                res,
                STATUS_CODE.FORBIDDEN,
                'Cannot deactivate admin account!'
            );
            return;
        }

        if (usersFound[0].active == ACCOUNT_STATE.deactive) {
            sendResponse(
                res,
                STATUS_CODE.BAD_REQUEST,
                'user account is already deactivated!'
            );
            return;
        }

        const updateQuery = `UPDATE ${TABLE_NAMES.users} SET active = ? WHERE id = ?`;
        const result = await excuteQuery(updateQuery, [
            ACCOUNT_STATE.deactive,
            req.params.user_id,
        ]);

        if (!result) {
            sendResponse(
                res,
                STATUS_CODE.INTERNAL_SERVER_ERROR,
                'Cannot deactivate user at this time!'
            );
            return;
        }

        sendResponse(res, STATUS_CODE.OK, 'Deactivated user successfully!');
    } catch (error) {
        sendResponse(
            res,
            STATUS_CODE.INTERNAL_SERVER_ERROR,
            'Something went wrongs!' + error
        );
    }
};
