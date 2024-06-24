const { tableNames } = require('../configs/constants.config');
const { selectData, comparePassWord } = require('../ultil.lib');

const signin = async (req, res) => {
    res.status(200).json('Sign in successfully!');
};

const authController = { signin };

module.exports = authController;
