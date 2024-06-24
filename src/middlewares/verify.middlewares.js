const jwt = require('jsonwebtoken');
const { USER_ROLES } = require('../configs/constants.config');

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

const middlewareControllers = {
    verifyToken,
    verifyAdminRole,
    verifyStaffRole,
};

module.exports = middlewareControllers;
