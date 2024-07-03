const { TABLE_NAMES } = require('../configs/constants.config');
const { STATUS_CODE } = require('../configs/status.codes.config');
const {
    selectData,
    convertDateToGMT7,
    convertTimeToGMT7,
    sendResponse,
} = require('../ultil.lib');

const getAllUser = async (req, res) => {
    const query = `SELECT * FROM ${TABLE_NAMES.users}`;

    const users = await selectData(query, []);

    const newUsers = users
        .filter(({ username }) => req.tokenPayload.username !== username)
        .map(({ password, ...other }) => {
            other.birthday = convertDateToGMT7(other.birthday);
            other.created_at = convertTimeToGMT7(other.created_at);

            return other;
        });

    sendResponse(res, STATUS_CODE.OK, 'Get all users successfully!', newUsers);
};

const userController = {
    getAllUser,
};

module.exports = userController;
