import { CustomRequest } from '@/src/types/requests';
import { Response } from 'express';

import { TABLE_NAMES } from '@/src/configs/constants.config';
import { STATUS_CODE } from '@/src/configs/status.codes.config';

import { selectData, sendResponse } from '@/src/ultil/ultil.lib';

export const getAllMotorcycleBrands = async (
    req: CustomRequest,
    res: Response
) => {
    try {
        const query = `SELECT * FROM ${TABLE_NAMES.motorcycle_brands}`;

        const brands = await selectData(query, []);

        sendResponse(
            res,
            STATUS_CODE.OK,
            'Get all motorcycle brands successfully!',
            brands
        );
    } catch (error) {
        sendResponse(
            res,
            STATUS_CODE.INTERNAL_SERVER_ERROR,
            'Something went wrongs!'
        );
    }
};
