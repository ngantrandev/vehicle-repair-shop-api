const path = require('path');
const sharp = require('sharp');

import { Response } from 'express';
import { CustomRequest } from '@/src/types/requests';
import { Service } from '@/src/types/models';

import { TABLE_NAMES } from '@/src/configs/constants.config';
import { STATUS_CODE } from '@/src/configs/status.codes.config';
import {
    isValidInteger,
    isValidTime,
    excuteQuery,
    selectData,
    sendResponse,
    executeTransaction,
} from '@/src/ultil/ultil.lib';

export const createService = async (req: CustomRequest, res: Response) => {
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
        let fileName = '';
        let relativePath = ''; /** path from root dir to image */

        if (req.file) {
            const buffer = req.file.buffer;
            fileName = Date.now() + '.webp';
            relativePath = path.join('./uploads', fileName);

            try {
                await sharp(buffer).webp({ quality: 20 }).toFile(relativePath);
            } catch (error) {
                sendResponse(
                    res,
                    STATUS_CODE.INTERNAL_SERVER_ERROR,
                    'cannot create booking at this time' + error
                );
                return;
            }
        }

        const insertedValues = [];

        const queryCreate = `INSERT INTO ${TABLE_NAMES.services} (category_id, name, description, price, estimated_time, image_url) VALUES (?, ?, ?, ?, ?, ?)`;

        for (const field of requiredFields) {
            insertedValues.push(req.body[field]);
        }

        insertedValues.push(relativePath);

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
            'Something went wrongs!' + error
        );
    }
};

export const updateService = async (req: CustomRequest, res: Response) => {
    const { items }: { items: number[] } = req.body;

    const serviceId = req.params.service_id;

    if (!serviceId) {
        sendResponse(res, STATUS_CODE.BAD_REQUEST, 'service_id is required');
        return;
    }

    if (!isValidInteger(serviceId)) {
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
        const servicesFound: Service[] = (await selectData(findQuery, [
            serviceId,
        ])) as Service[];

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

        let fileName = '';
        let relativePath = ''; /** path from root dir to image */
        const updateFields = [];
        const updateValues = [];

        if (req.file) {
            const buffer = req.file.buffer;
            fileName = Date.now() + '.webp';
            relativePath = path.join('./uploads', fileName);

            try {
                await sharp(buffer).webp({ quality: 20 }).toFile(relativePath);

                updateFields.push('image_url = ?');
                updateValues.push(relativePath);
            } catch (error) {
                sendResponse(
                    res,
                    STATUS_CODE.INTERNAL_SERVER_ERROR,
                    'cannot create booking at this time' + error
                );
                return;
            }
        }

        for (const field of possibleFields) {
            if (!req.body[field]) {
                continue;
            }

            updateFields.push(`${field} = ?`);
            updateValues.push(req.body[field]);
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
            serviceId,
        ]);

        if (items && items.length > 0) {
            const args: Number[] = [];
            const updateServiceItemsQuery = `
                INSERT INTO ${TABLE_NAMES.services_items} (item_id, service_id) VALUES 
                ${items
                    .map((item) => {
                        args.push(item);
                        args.push(Number(serviceId));
                        return '(?, ?)';
                    })
                    .join(', ')}
            `;

            await executeTransaction(
                [
                    ` DELETE FROM ${TABLE_NAMES.services_items} WHERE service_id = ${serviceId}`,
                    updateServiceItemsQuery,
                ],
                [[], args]
            );
        }

        if (!result) {
            sendResponse(
                res,
                STATUS_CODE.INTERNAL_SERVER_ERROR,
                'Cannot update service info at this time!'
            );
            return;
        }

        sendResponse(res, STATUS_CODE.OK, 'Updated service info successfully!');
    } catch (error) {
        sendResponse(
            res,
            STATUS_CODE.INTERNAL_SERVER_ERROR,
            'Something went wrongs!' + error
        );
    }
};

export const deleteService = async (req: CustomRequest, res: Response) => {
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
        const servicesFound: Service[] = (await selectData(findQuery, [
            req.params.service_id,
        ])) as Service[];

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
            'Something went wrongs!' + error
        );
    }
};
