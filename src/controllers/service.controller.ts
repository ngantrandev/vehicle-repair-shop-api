import { CustomRequest } from '@/src/types/requests';
import { Response } from 'express';
import { ServiceResponse } from '@/src/types/responses';

import { QUERY_SELECT_SERVICE_BY_ID } from '@/src/configs/queries.config';
import {
    selectData,
    isValidInteger,
    sendResponse,
} from '@/src/ultil/ultil.lib';
import { STATUS_CODE } from '@/src/configs/status.codes.config';

export const getServiceById = async (req: CustomRequest, res: Response) => {
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
        const selectQuery = QUERY_SELECT_SERVICE_BY_ID;
        const servicesFound: ServiceResponse[] = (await selectData(
            selectQuery,
            [req.params.service_id]
        )) as ServiceResponse[];

        if (servicesFound.length === 0) {
            sendResponse(res, STATUS_CODE.NOT_FOUND, 'Service not found!');
            return;
        }

        const { category_id, category_name, category_desc, ...other } =
            servicesFound[0];
        other.category = {
            id: category_id as number,
            name: category_name,
            description: category_desc,
        };

        sendResponse(
            res,
            STATUS_CODE.OK,
            'Get service by id successfully!',
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
