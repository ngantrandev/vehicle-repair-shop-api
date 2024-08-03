const { TABLE_NAMES } = require('../configs/constants.config');
const { QUERY_SELECT_SERVICE_BY_ID } = require('../configs/queries.config');
const { STATUS_CODE } = require('../configs/status.codes.config');
const {
    isValidInteger,
    isValidTime,
    excuteQuery,
    selectData,
    sendResponse,
} = require('../ultil.lib');

const createService = async (req, res) => {
    const requiredFields = [
        'category_id',
        'name',
        'description',
        'price',
        'estimated_time',
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

    /** VALIDATE VALUE TYPE */

    if (!isValidInteger(req.body.category_id)) {
        sendResponse(
            res,
            STATUS_CODE.BAD_REQUEST,
            `category_id must be integer`
        );
        return;
    }

    if (!isValidTime(req.body.estimated_time)) {
        sendResponse(
            res,
            STATUS_CODE.BAD_REQUEST,
            `estimated_time must be format like HH:mm:ss`
        );
        return;
    }

    if (!isValidInteger(req.body.price)) {
        sendResponse(res, STATUS_CODE.BAD_REQUEST, `price must be integer`);
        return;
    }

    /** CREATE SERVICE */

    try {
        const insertedFields = requiredFields.map((field) => ` ${field}`);
        const insertedValues = [];

        const queryCreate = `INSERT INTO ${TABLE_NAMES.services} (${insertedFields}) VALUES (?, ?, ?, ?, ?)`;

        for (const field of requiredFields) {
            insertedValues.push(req.body[field]);
        }

        const result = await excuteQuery(queryCreate, insertedValues);

        if (!result) {
            sendResponse(
                res,
                STATUS_CODE.INTERNAL_SERVER_ERROR,
                'Cannot create service at this time!'
            );

            return;
        }

        sendResponse(res, STATUS_CODE.OK, 'Created service successfully!');
    } catch (error) {
        sendResponse(
            res,
            STATUS_CODE.INTERNAL_SERVER_ERROR,
            'Something went wrongs!'
        );
    }
};

const updateService = async (req, res) => {
    if (!req.params.service_id) {
        sendResponse(res, STATUS_CODE.BAD_REQUEST, 'service_id is required');
        return;
    }

    if (!isValidInteger(req.params.service_id)) {
        sendResponse(
            res,
            STATUS_CODE.BAD_REQUEST,
            'service_id must be interger'
        );
        return;
    }

    if (req.body.estimated_time && !isValidTime(req.body.estimated_time)) {
        sendResponse(
            res,
            STATUS_CODE.BAD_REQUEST,
            `estimated_time must be format like HH:mm:ss`
        );
        return;
    }

    if (req.body.price && !isValidInteger(req.body.price)) {
        sendResponse(res, STATUS_CODE.BAD_REQUEST, `price must be integer`);
        return;
    }

    try {
        /**FIND SERVICE */
        const findQuery = `SELECT * FROM ${TABLE_NAMES.services} WHERE id = ?`;
        const servicesFound = await selectData(findQuery, [
            req.params.service_id,
        ]);

        if (servicesFound.length === 0) {
            sendResponse(res, STATUS_CODE.NOT_FOUND, 'service not found!');
            return;
        }

        const possibleFields = [
            'category_id',
            'name',
            'description',
            'price',
            'estimated_time',
            'image_file',
            'active',
        ];

        const updateFields = [];
        const updateValues = [];

        for (const field of possibleFields) {
            if (!req.body[field]) {
                continue;
            }

            if (field === 'image_file') {
                /**
                 * Save file
                 * get file path
                 * save file path to image_url field
                 */
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
            UPDATE ${TABLE_NAMES.services}
            SET ${updateFields.join(', ')}
            WHERE id = ?
        `;

        const result = await excuteQuery(updateQuery, [
            ...updateValues,
            req.params.service_id,
        ]);

        if (!result) {
            sendResponse(
                res,
                STATUS_CODE.INTERNAL_SERVER_ERROR,
                'Cannot update service info at this time!'
            );
            return;
        }

        // response updated service
        const querySelect = QUERY_SELECT_SERVICE_BY_ID;
        const updatedServices = await selectData(querySelect, [
            req.params.service_id,
        ]);

        const { category_id, category_name, category_desc, ...other } =
            updatedServices[0];

        other.category = {
            id: category_id,
            name: category_name,
            description: category_desc,
        };

        sendResponse(
            res,
            STATUS_CODE.OK,
            'Updated service info successfully!',
            other
        );
    } catch (error) {
        sendResponse(
            res,
            STATUS_CODE.INTERNAL_SERVER_ERROR,
            'Something went wrongs!'
        );
    }
};

const deleteService = async (req, res) => {
    if (!req.params.service_id) {
        sendResponse(res, STATUS_CODE.BAD_REQUEST, 'service_id is required');

        return;
    }

    if (!isValidInteger(req.params.service_id)) {
        sendResponse(
            res,
            STATUS_CODE.BAD_REQUEST,
            'service_id must be interger'
        );
        return;
    }

    try {
        /**FIND SERVICE */
        const findQuery = `SELECT * FROM ${TABLE_NAMES.services} WHERE id = ?`;
        const servicesFound = await selectData(findQuery, [
            req.params.service_id,
        ]);

        if (servicesFound.length === 0) {
            sendResponse(res, STATUS_CODE.NOT_FOUND, 'service not found!');
            return;
        }

        /**DELETE SERVICE */
        const deleteQuery = `DELETE FROM ${TABLE_NAMES.services} WHERE id = ?`;
        const result = await excuteQuery(deleteQuery, [req.params.service_id]);

        if (!result) {
            sendResponse(
                res,
                STATUS_CODE.INTERNAL_SERVER_ERROR,
                'Cannot delete service at this time!'
            );

            return;
        }

        sendResponse(res, STATUS_CODE.OK, 'Deleted service successfully!');
    } catch (error) {
        sendResponse(
            res,
            STATUS_CODE.INTERNAL_SERVER_ERROR,
            'Something went wrongs!'
        );
    }
};

const adminServiceController = {
    createService,
    updateService,
    deleteService,
};

module.exports = adminServiceController;
