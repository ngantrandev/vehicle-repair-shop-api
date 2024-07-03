const jwt = require('jsonwebtoken');
const { USER_ROLES, TABLE_NAMES } = require('../configs/constants.config');
const { selectData } = require('../ultil.lib');

const verifyToken = (req, res, next) => {
    const token = req.headers.token;

    if (token) {
        const accessToken = token.split(' ')[1];

        jwt.verify(
            accessToken,
            process.env.JWT_ACCESS_TOKEN,
            (err, tokenPayload) => {
                if (err) {
                    res.status(403).json({
                        success: false,
                        message: 'Token is not valid',
                    });
                    return;
                }
                req.tokenPayload = tokenPayload;
                next();
            }
        );
    } else {
        res.status(401).json({
            success: false,
            message: 'Not authenticated!',
        });
        return;
    }
};

const verifyAdminRole = (req, res, next) => {
    const role = req.tokenPayload.role;

    if (!role || role !== USER_ROLES.admin) {
        res.status(403).json({
            success: false,
            message: 'You are not allowed to do this action',
        });
        return;
    }
    next();
};

const verifyStaffRole = (req, res, next) => {
    const role = req.tokenPayload.role;

    if (!role || (role !== USER_ROLES.admin && role !== USER_ROLES.staff)) {
        res.status(403).json({
            success: false,
            message: 'You are not allowed to do this action',
        });
        return;
    }
    next();
};

const verifyOwner = async (req, res, next) => {
    if (!req.params.user_id) {
        res.status(400).json({
            success: false,
            message: 'missing user id param',
        });

        return;
    }

    const query = `SELECT * FROM ${TABLE_NAMES.users} WHERE id = ?`;
    const users = await selectData(query, [req.params.user_id]);

    // not found this user with id
    if (users.length === 0) {
        res.status(404).json({
            success: false,
            message: 'Not found this user',
        });
        return;
    }

    // difference user
    if (users[0].username != req.tokenPayload.username) {
        res.status(403).json({
            success: false,
            message: 'You are not allowed to do this action',
        });
        return;
    }

    next();
};

const middlewareControllers = {
    verifyToken,
    verifyAdminRole,
    verifyStaffRole,
    verifyOwner,
};

module.exports = middlewareControllers;
