import { Response } from 'express';
import { CustomRequest } from '@/src/types/requests';

import { TABLE_NAMES, ACCOUNT_STATE } from '@/src/configs/constants.config';
import { QUERY_SELECT_STAFF_BY_ID } from '@/src/configs/queries.config';
import { STATUS_CODE } from '@/src/configs/status.codes.config';
import {
    selectData,
    isValidInteger,
    convertDateToGMT7,
    convertTimeToGMT7,
    hashPassWord,
    getCurrentTimeInGMT7,
    excuteQuery,
    sendResponse,
} from '@/src/ultil/ultil.lib';
import { StaffResponse } from '@/src/types/responses';
import { Staff } from '@/src/types/models';

export const getStaffById = async (req: CustomRequest, res: Response) => {
    if (!req.params.staff_id) {
        sendResponse(res, STATUS_CODE.BAD_REQUEST, 'staff_id is required');
        return;
    }

    if (!isValidInteger(req.params.staff_id)) {
        sendResponse(res, STATUS_CODE.BAD_REQUEST, 'staff_id must be interger');
        return;
    }

    try {
        const query = QUERY_SELECT_STAFF_BY_ID;

        const staffs: StaffResponse[] = (await selectData(query, [
            req.params.staff_id,
        ])) as StaffResponse[];

        if (staffs.length === 0) {
            sendResponse(res, STATUS_CODE.NOT_FOUND, 'Staff not found!');
            return;
        }

        // eslint-disable-next-line no-unused-vars
        const { password, station_id, service_station_name, ...other } =
            staffs[0];
        other.birthday = convertDateToGMT7(other.birthday);
        other.created_at = convertTimeToGMT7(other.created_at);

        if (station_id) {
            other.service_station = {
                id: station_id,
                name: service_station_name,
            };
        }

        sendResponse(res, STATUS_CODE.OK, 'Find staff successfully!', other);
    } catch (error) {
        sendResponse(
            res,
            STATUS_CODE.INTERNAL_SERVER_ERROR,
            'Something went wrongs!' + error
        );
    }
};

export const createStaff = async (req: CustomRequest, res: Response) => {
    const requiredFields = [
        'username',
        'password',
        'firstname',
        'lastname',
        'email',
        'station_id',
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

    /**VALIDATE VALUE */
    if (!isValidInteger(req.body.station_id)) {
        sendResponse(
            res,
            STATUS_CODE.BAD_REQUEST,
            `station id must be interger`
        );
        return;
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

        const insertedFields = [];
        const insertedValues = [];

        for (const field of requiredFields) {
            const value = req.body[field];

            if (field === 'password') {
                const hash = await hashPassWord(value);
                insertedValues.push(hash);
            } else {
                insertedValues.push(value);
            }

            insertedFields.push(`${field} `);
        }

        const queryCreate = `INSERT INTO ${TABLE_NAMES.staffs} (${insertedFields}, created_at, active) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

        // add time created
        insertedValues.push(getCurrentTimeInGMT7());
        // set account state: active state
        insertedValues.push(ACCOUNT_STATE.active);

        const result = await excuteQuery(queryCreate, insertedValues);

        if (!result) {
            sendResponse(
                res,
                STATUS_CODE.INTERNAL_SERVER_ERROR,
                'Cannot create staff at this time!'
            );

            return;
        }

        sendResponse(
            res,
            STATUS_CODE.OK,
            'Created staff account successfully!'
        );
    } catch (error) {
        sendResponse(
            res,
            STATUS_CODE.INTERNAL_SERVER_ERROR,
            'Something went wrongs!' + error
        );
    }
};

export const updateStaff = async (req: CustomRequest, res: Response) => {
    if (!req.params.staff_id) {
        sendResponse(res, STATUS_CODE.BAD_REQUEST, 'staff_id is required');
        return;
    }

    if (!isValidInteger(req.params.staff_id)) {
        sendResponse(res, STATUS_CODE.BAD_REQUEST, 'staff_id must be interger');
        return;
    }

    try {
        /**FIND USER */
        const findStaffQuery = `
            SELECT * FROM ${TABLE_NAMES.staffs} WHERE id = ?
        `;
        const staffsFound: Staff[] = (await selectData(findStaffQuery, [
            req.params.staff_id,
        ])) as Staff[];

        if (staffsFound.length === 0) {
            sendResponse(res, STATUS_CODE.NOT_FOUND, 'Staff not found!');
            return;
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
            'station_id',
            'active',
        ];

        const updateFields = [];
        const updateValues = [];

        for (const field of possibleFields) {
            if (!req.body[field]) {
                continue;
            }

            if (field === 'username') {
                if (
                    await isUsernameExist(
                        req.body[field],
                        Number(req.params.staff_id)
                    )
                ) {
                    sendResponse(
                        res,
                        STATUS_CODE.CONFLICT,
                        'username already exist!'
                    );
                    return;
                }

                updateFields.push(`${field} = ?`);
                updateValues.push(req.body[field]);
            } else if (field === 'password') {
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
            UPDATE ${TABLE_NAMES.staffs}
            SET ${updateFields}
            WHERE id = ?
        `;

        const result = await excuteQuery(updateQuery, [
            ...updateValues,
            req.params.staff_id,
        ]);

        if (!result) {
            sendResponse(
                res,
                STATUS_CODE.INTERNAL_SERVER_ERROR,
                'Cannot update staff info at this time!'
            );
            return;
        }

        const querySelect = QUERY_SELECT_STAFF_BY_ID;
        const updatedStaffs: StaffResponse[] = (await selectData(querySelect, [
            req.params.staff_id,
        ])) as StaffResponse[];

        // eslint-disable-next-line no-unused-vars
        const { password, station_id, service_station_name, ...other } =
            updatedStaffs[0];
        other.created_at = convertTimeToGMT7(other.created_at);
        other.birthday = convertDateToGMT7(other.birthday);

        if (station_id) {
            other.service_station = {
                id: station_id,
                name: service_station_name,
            };
        }

        sendResponse(
            res,
            STATUS_CODE.OK,
            'Updated staff info successfully!',
            other
        );
    } catch (error) {
        sendResponse(
            res,
            STATUS_CODE.INTERNAL_SERVER_ERROR,
            'Something went wrongs!' + error
        );
    }
};

export const deactivateStaff = async (req: CustomRequest, res: Response) => {
    if (!req.params.staff_id) {
        sendResponse(res, STATUS_CODE.BAD_REQUEST, 'staff_id is required');
        return;
    }

    if (!isValidInteger(req.params.staff_id)) {
        sendResponse(res, STATUS_CODE.BAD_REQUEST, 'staff_id must be interger');
        return;
    }

    try {
        /**FIND STAFF */
        const findStaffQuery = `
     SELECT * FROM ${TABLE_NAMES.staffs} WHERE id = ?
 `;

        const staffsFound: Staff[] = (await selectData(findStaffQuery, [
            req.params.staff_id,
        ])) as Staff[];
        if (staffsFound.length === 0) {
            sendResponse(res, STATUS_CODE.NOT_FOUND, 'Staff not found!');
            return;
        }

        if (staffsFound[0].active == ACCOUNT_STATE.deactive) {
            sendResponse(
                res,
                STATUS_CODE.BAD_REQUEST,
                'Staff account is already deactivated!'
            );
            return;
        }

        const updateQuery = `
     UPDATE ${TABLE_NAMES.staffs}
     SET active = ?
     WHERE id = ?
 `;

        const result = await excuteQuery(updateQuery, [
            ACCOUNT_STATE.deactive,
            req.params.staff_id,
        ]);

        if (!result) {
            sendResponse(
                res,
                STATUS_CODE.INTERNAL_SERVER_ERROR,
                'Cannot deactivate staff at this time!'
            );
            return;
        }

        sendResponse(
            res,
            STATUS_CODE.OK,
            'Deactivated staff account successfully!'
        );
    } catch (error) {
        sendResponse(
            res,
            STATUS_CODE.INTERNAL_SERVER_ERROR,
            'Something went wrongs!' + error
        );
    }
};

export const isUsernameExist = async (username: string, id: number) => {
    /**FIND USERNAME EXIST */
    const query = `
        SELECT id FROM ${TABLE_NAMES.users} WHERE username = ?
        UNION
        SELECT id FROM ${TABLE_NAMES.staffs} WHERE username = ? AND id != ?
    `;

    const staffsFound: any[] = (await selectData(query, [
        username,
        username,
        id,
    ])) as any[];

    if (staffsFound.length > 0) {
        return true;
    }

    return false;
};
