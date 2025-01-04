import { CustomRequest } from '@/src/types/requests';
import { Response } from 'express';

import { TABLE_NAMES } from '@/src/configs/constants.config';
import { STATUS_CODE } from '@/src/configs/status.codes.config';
import { excuteQuery, sendResponse } from '@/src/ultil/ultil.lib';

export const getServiceCategory = async (req: CustomRequest, res: Response) => {
    try {
        const query = `SELECT * FROM ${TABLE_NAMES.service_categories}`;

        const categories = await excuteQuery(query, []);

        sendResponse(
            res,
            STATUS_CODE.OK,
            'Get service categories successfully',
            categories
        );
    } catch (error) {
        sendResponse(
            res,
            STATUS_CODE.INTERNAL_SERVER_ERROR,
            'Internal Server Error' + error
        );
    }
};
