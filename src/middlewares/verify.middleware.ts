import { NextFunction, Response } from 'express';
import { STATUS_CODE } from '@/src/configs/status.codes.config';
import { CustomRequest } from '@/src/types/requests';

import jwt from 'jsonwebtoken';
import {
    USER_ROLES,
    TABLE_NAMES,
    ACCOUNT_STATE,
} from '@/src/configs/constants.config';
import {
    selectData,
    isValidInteger,
    sendResponse,
} from '@/src/ultil/ultil.lib';
import { User, Staff } from '@/src/types/models';

const accessTokenSecret = process.env.JWT_ACCESS_TOKEN;

export const verifyToken = (
    req: CustomRequest,
    res: Response,
    next: NextFunction
) => {
    const token = req.headers.token as string | undefined;

    if (token) {
        const accessToken = token.split(' ')[1];

        if (!accessTokenSecret) {
            sendResponse(
                res,
                STATUS_CODE.INTERNAL_SERVER_ERROR,
                'Token secret is not defined'
            );
            return;
        }

        jwt.verify(
            accessToken,
            accessTokenSecret,
            (err: jwt.VerifyErrors | null, decoded: any) => {
                if (err) {
                    sendResponse(
                        res,
                        STATUS_CODE.FORBIDDEN,
                        'Token is not valid'
                    );
                    return;
                }
                req.tokenPayload = decoded;
                next();
            }
        );
    } else {
        sendResponse(res, STATUS_CODE.UNAUTHORIZED, 'Token is not provided');
    }
};
export const verifyAdminRole = (
    req: CustomRequest,
    res: Response,
    next: NextFunction
) => {
    const role = req.tokenPayload.role;

    if (!role || role !== USER_ROLES.admin) {
        sendResponse(
            res,
            STATUS_CODE.FORBIDDEN,
            'You are not allowed to do this action'
        );
        return;
    }

    next();
};
export const verifyStaffRole = (
    req: CustomRequest,
    res: Response,
    next: NextFunction
) => {
    const role = req.tokenPayload.role;

    if (!role || (role !== USER_ROLES.admin && role !== USER_ROLES.staff)) {
        sendResponse(
            res,
            STATUS_CODE.FORBIDDEN,
            'You are not allowed to do this action'
        );
        return;
    }

    next();
};
export const verifyCurrentUser = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
) => {
    if (!req.params.user_id) {
        sendResponse(res, STATUS_CODE.BAD_REQUEST, 'missing user_id param');

        return;
    }

    if (!isValidInteger(req.params.user_id)) {
        sendResponse(res, STATUS_CODE.BAD_REQUEST, 'user id must be interger');
        return;
    }

    const query = `SELECT * FROM ${TABLE_NAMES.users} WHERE id = ?`;
    const users: User[] = (await selectData(query, [
        req.params.user_id,
    ])) as User[];

    // not found this user with id
    if (users.length === 0) {
        sendResponse(res, STATUS_CODE.NOT_FOUND, 'not found this user');
        return;
    }

    if (users[0].active == ACCOUNT_STATE.deactive) {
        sendResponse(
            res,
            STATUS_CODE.FORBIDDEN,
            'This user account has been deactive'
        );
        return;
    }

    // difference user
    if (
        users[0].id != req.tokenPayload.user_id &&
        req.tokenPayload.role != USER_ROLES.admin
    ) {
        sendResponse(
            res,
            STATUS_CODE.FORBIDDEN,
            'You are not allowed to do this action'
        );
        return;
    }

    next();
};
export const verifyCurrentStaff = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
) => {
    if (!req.params.staff_id) {
        sendResponse(res, STATUS_CODE.BAD_REQUEST, 'missing staff_id param');

        return;
    }

    if (!isValidInteger(req.params.staff_id)) {
        sendResponse(res, STATUS_CODE.BAD_REQUEST, 'staff id must be interger');
        return;
    }

    const query = `SELECT * FROM ${TABLE_NAMES.staffs} WHERE id = ?`;
    const staffs: Staff[] = (await selectData(query, [
        req.params.staff_id,
    ])) as Staff[];

    // not found this staff with id
    if (staffs.length === 0) {
        sendResponse(res, STATUS_CODE.NOT_FOUND, 'not found this staff');
        return;
    }

    if (staffs[0].active == ACCOUNT_STATE.deactive) {
        sendResponse(
            res,
            STATUS_CODE.FORBIDDEN,
            'This staff account has been deactive'
        );
        return;
    }

    // difference staff
    if (
        staffs[0].id != req.tokenPayload.user_id &&
        req.tokenPayload.role != USER_ROLES.admin
    ) {
        sendResponse(
            res,
            STATUS_CODE.FORBIDDEN,
            'You are not allowed to do this action'
        );
        return;
    }

    next();
};
