import { Response } from 'express';
import { CustomRequest } from '@/src/types/requests';
import { StaffResponse } from '@/src/types/responses';

import { TABLE_NAMES } from '@/src/configs/constants.config';
import { STATUS_CODE } from '@/src/configs/status.codes.config';
import {
    selectData,
    convertDateToGMT7,
    convertTimeToGMT7,
    sendResponse,
} from '@/src/ultil/ultil.lib';

export const getAllStaffs = async (req: CustomRequest, res: Response) => {
    try {
        const query = `
        SELECT
            s.*,
            ss.name AS service_station_name,
            IFNULL(COUNT(b.id), 0) AS current_tasks
        FROM ${TABLE_NAMES.staffs} AS s
        JOIN ${TABLE_NAMES.service_stations} AS ss ON s.station_id = ss.id
        LEFT JOIN ${TABLE_NAMES.bookings} b ON s.id = b.staff_id AND b.status NOT IN ('cancelled', 'done')
        GROUP BY s.id
        ORDER BY current_tasks DESC
    `;

        const staffs: StaffResponse[] = (await selectData(
            query,
            []
        )) as StaffResponse[];

        const newStaffs = staffs.map(
            ({ password, station_id, service_station_name, ...other }) => {
                other.birthday = convertDateToGMT7(other.birthday);
                other.created_at = convertTimeToGMT7(other.created_at);

                if (station_id) {
                    other.service_station = {
                        id: station_id,
                        name: service_station_name,
                    };
                }

                return other;
            }
        );

        sendResponse(
            res,
            STATUS_CODE.OK,
            'Get all staffs successfully!',
            newStaffs
        );
    } catch (error: any) {
        sendResponse(
            res,
            STATUS_CODE.INTERNAL_SERVER_ERROR,
            'something went wrong' + error.message
        );
    }
};
