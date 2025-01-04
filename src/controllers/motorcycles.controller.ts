import { CustomRequest } from '@/src/types/requests';
import { Response } from 'express';

import { TABLE_NAMES } from '@/src/configs/constants.config';
import { selectData, sendResponse } from '@/src/ultil/ultil.lib';
import { STATUS_CODE } from '@/src/configs/status.codes.config';

export const getAllMotorcycles = async (req: CustomRequest, res: Response) => {
    try {
        const query = `
        SELECT
            m.*,
            mb.name AS brand_name
        FROM
            ${TABLE_NAMES.motorcycles} AS m
        JOIN
            ${TABLE_NAMES.motorcycle_brands} AS mb ON mb.id = m.brand_id
    `;

        const motorcycles: any[] = (await selectData(query, [])) as any[];

        const newList = motorcycles.map(
            ({ brand_id, brand_name, ...other }) => {
                other.brand = {
                    id: brand_id,
                    name: brand_name,
                };

                return other;
            }
        );

        sendResponse(
            res,
            STATUS_CODE.OK,
            'Get all motorcycles successfully!',
            newList
        );
    } catch (error) {
        sendResponse(
            res,
            STATUS_CODE.INTERNAL_SERVER_ERROR,
            'something went wrongs!'
        );
    }
};
