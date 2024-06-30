const { TABLE_NAMES } = require('../configs/constants.config');
const { QUERY_SELECT_SERVICE_BY_ID } = require('../configs/queries.config');
const {
    isValidInteger,
    isValidTime,
    excuteQuery,
    selectData,
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
            return res.status(400).json({
                success: false,
                message: `Missing required field: ${field}`,
            });
        }
    }

    /** VALIDATE VALUE TYPE */

    if (!isValidInteger(req.body.category_id)) {
        return res.status(400).json({
            success: false,
            message: `category_id must be integer`,
        });
    }

    if (!isValidTime(req.body.estimated_time)) {
        return res.status(400).json({
            success: false,
            message: `estimated_time must be format like HH:mm:ss`,
        });
    }

    if (!isValidInteger(req.body.price)) {
        return res.status(400).json({
            success: false,
            message: `price must be integer`,
        });
    }

    /** CREATE SERVICE */

    const insertedFields = requiredFields.map((field) => ` ${field}`);
    const insertedValues = [];

    const queryCreate = `INSERT INTO ${TABLE_NAMES.services} (${insertedFields}) VALUES (?, ?, ?, ?, ?)`;

    for (const field of requiredFields) {
        insertedValues.push(req.body[field]);
    }

    const result = await excuteQuery(queryCreate, insertedValues);

    if (!result) {
        res.status(500).json({
            success: false,
            message: 'Somthing went wrongs!',
        });

        return;
    }

    res.status(200).json({
        success: true,
        message: 'Created service successfully!',
    });
};

const updateService = async (req, res) => {
    if (!req.params.id) {
        res.status(400).json({
            success: false,
            message: 'id is required',
        });
        return;
    }

    if (!isValidInteger(req.params.id)) {
        res.status(400).json({
            success: false,
            message: 'id must be interger',
        });
        return;
    }

    if (req.body.estimated_time && !isValidTime(req.body.estimated_time)) {
        return res.status(400).json({
            success: false,
            message: `estimated_time must be format like HH:mm:ss`,
        });
    }

    if (req.body.price && !isValidInteger(req.body.price)) {
        return res.status(400).json({
            success: false,
            message: `price must be integer`,
        });
    }

    /**FIND SERVICE */
    const findQuery = `SELECT * FROM ${TABLE_NAMES.services} WHERE id = ?`;
    const servicesFound = await selectData(findQuery, [req.params.id]);

    if (servicesFound.length === 0) {
        res.status(404).json({
            success: false,
            message: 'service not found!',
        });
        return;
    }

    const possibleFields = [
        'category_id',
        'name',
        'description',
        'price',
        'estimated_time',
        'image_file',
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
        res.status(400).json({
            success: false,
            message: 'No fields to update',
        });
        return;
    }

    try {
        const updateQuery = `
            UPDATE ${TABLE_NAMES.services}
            SET ${updateFields.join(', ')}
            WHERE id = ?
        `;

        const result = await excuteQuery(updateQuery, [
            ...updateValues,
            req.params.id,
        ]);

        if (!result) {
            return res.status(500).json({
                success: false,
                message: 'Cannot update service info at this time!',
            });
        }

        // response updated service
        const querySelect = QUERY_SELECT_SERVICE_BY_ID;
        const updatedServices = await selectData(querySelect, [req.params.id]);

        res.status(200).json({
            success: true,
            message: 'Updated service info successfully!',
            data: updatedServices[0],
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'something went wrongs!',
        });
    }
};

const deleteService = async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({
            success: false,
            message: 'id is required',
        });
    }

    if (!isValidInteger(req.params.id)) {
        res.status(400).json({
            success: false,
            message: 'id must be interger',
        });
        return;
    }

    /**FIND SERVICE */
    const findQuery = `SELECT * FROM ${TABLE_NAMES.services} WHERE id = ?`;
    const servicesFound = await selectData(findQuery, [req.params.id]);

    if (servicesFound.length === 0) {
        res.status(404).json({
            success: false,
            message: 'service not found!',
        });
        return;
    }

    /**DELETE SERVICE */
    const deleteQuery = `DELETE FROM ${TABLE_NAMES.services} WHERE id = ?`;
    const result = await excuteQuery(deleteQuery, [req.params.id]);

    if (!result) {
        res.status(500).json({
            success: false,
            message: 'Somthing went wrongs!',
        });

        return;
    }

    res.status(200).json({
        success: true,
        message: 'Deleted service successfully!',
    });
};

const adminServiceController = {
    createService,
    updateService,
    deleteService,
};

module.exports = adminServiceController;
