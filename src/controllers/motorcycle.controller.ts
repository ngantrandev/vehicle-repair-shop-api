import { CustomRequest } from '@/src/types/requests';
import { Response } from 'express';

import { TABLE_NAMES } from '@/src/configs/constants.config';
import {
    selectData,
    isValidInteger,
    sendResponse,
} from '@/src/ultil/ultil.lib';
import { STATUS_CODE } from '@/src/configs/status.codes.config';

export const getAllServicesByMotorcycleId = async (
    req: CustomRequest,
    res: Response
) => {
    if (!req.params.motorcycle_id) {
        sendResponse(res, STATUS_CODE.BAD_REQUEST, 'motorcycle_id is required');
        return;
    }

    if (!isValidInteger(req.params.motorcycle_id)) {
        sendResponse(
            res,
            STATUS_CODE.BAD_REQUEST,
            'motorcycle id must be interger'
        );
        return;
    }

    try {
        const query = `
        SELECT DISTINCT
            s.*,
            sc.name AS category_name,
            sc.description AS category_desc
        FROM
            ${TABLE_NAMES.services} AS s
        JOIN
            ${TABLE_NAMES.service_categories} AS sc ON sc.id = s.category_id
        JOIN
            ${TABLE_NAMES.service_motorcycles} AS sm ON sm.service_id = s.id
        JOIN
            ${TABLE_NAMES.motorcycles} AS m ON m.id = sm.motorcycle_id
        JOIN
            ${TABLE_NAMES.motorcycle_brands} AS mb ON mb.id = m.brand_id
        WHERE
            m.id = ?
    `;

        const motorcycles: any[] = (await selectData(query, [
            req.params.motorcycle_id,
        ])) as any[];

        const newList = motorcycles.map(
            ({ category_id, category_name, category_desc, ...other }) => {
                other.category = {
                    id: category_id,
                    name: category_name,
                    description: category_desc,
                };

                return other;
            }
        );

        sendResponse(
            res,
            STATUS_CODE.OK,
            'get services by motorcycle id successfully!',
            newList
        );
    } catch (error) {
        sendResponse(
            res,
            STATUS_CODE.INTERNAL_SERVER_ERROR,
            'Something went wrongs!'
        );
    }
};
