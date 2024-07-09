const jwt = require('jsonwebtoken');
const {
    USER_ROLES,
    TABLE_NAMES,
    ACCOUNT_STATE,
} = require('../configs/constants.config');
const { selectData, isValidInteger, sendResponse } = require('../ultil.lib');
const { STATUS_CODE } = require('../configs/status.codes.config');

const verifyToken = (req, res, next) => {
    const token = req.headers.token;

    if (token) {
        const accessToken = token.split(' ')[1];

        jwt.verify(
            accessToken,
            process.env.JWT_ACCESS_TOKEN,
            (err, tokenPayload) => {
                if (err) {
                    sendResponse(
                        res,
                        STATUS_CODE.FORBIDDEN,
                        'Token is not valid'
                    );
                    return;
                }
                req.tokenPayload = tokenPayload;
                next();
            }
        );
    } else {
        sendResponse(res, STATUS_CODE.UNAUTHORIZED, 'Token is not provided');
        return;
    }
};

const verifyAdminRole = (req, res, next) => {
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

const verifyStaffRole = (req, res, next) => {
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

const verifyCurrentUser = async (req, res, next) => {
    if (!req.params.user_id) {
        sendResponse(res, STATUS_CODE.BAD_REQUEST, 'missing user_id param');

        return;
    }

    if (!isValidInteger(req.params.user_id)) {
        sendResponse(res, STATUS_CODE.BAD_REQUEST, 'user id must be interger');
        return;
    }

    const query = `SELECT * FROM ${TABLE_NAMES.users} WHERE id = ?`;
    const users = await selectData(query, [req.params.user_id]);

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
        users[0].username != req.tokenPayload.username &&
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

const verifyCurrentStaff = async (req, res, next) => {
    if (!req.params.staff_id) {
        sendResponse(res, STATUS_CODE.BAD_REQUEST, 'missing staff_id param');

        return;
    }

    if (!isValidInteger(req.params.staff_id)) {
        sendResponse(res, STATUS_CODE.BAD_REQUEST, 'staff id must be interger');
        return;
    }

    const query = `SELECT * FROM ${TABLE_NAMES.staffs} WHERE id = ?`;
    const staffs = await selectData(query, [req.params.staff_id]);

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
        staffs[0].username != req.tokenPayload.username &&
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

const middlewareControllers = {
    verifyToken,
    verifyAdminRole,
    verifyStaffRole,
    verifyCurrentUser,
    verifyCurrentStaff,
};

module.exports = middlewareControllers;
