const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers.token;

    if (token) {
        const accessToken = token.split(' ')[1];

        jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN, (err, user) => {
            if (err) {
                res.status(403).json({
                    success: false,
                    message: 'Token is not valid',
                });
                return;
            }
            req.user = user;
            next();
        });
    } else {
        res.status(401).json({
            success: false,
            message: 'Not authenticated!',
        });
        return;
    }
};

const middlewareControllers = {
    verifyToken,
};

module.exports = middlewareControllers;
