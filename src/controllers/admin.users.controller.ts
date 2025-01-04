import { Response } from 'express';
import { CustomRequest } from '@/src/types/requests';
import { UserResponse } from '@/src/types/responses';

const { TABLE_NAMES } = require('@/src/configs/constants.config');
const { STATUS_CODE } = require('@/src/configs/status.codes.config');
const { selectData, sendResponse } = require('@/src/ultil/ultil.lib');

export const getAllUser = async (req: CustomRequest, res: Response) => {
    try {
        const query = `
        SELECT
            u.*,
            addr.latitude AS address_latitude,
            addr.longitude AS address_longitude,
            addr.id AS address_id,
            addr.place_id AS place_id,
            addr.address_name AS address_name,
            addr.full_address AS full_address
        FROM (
            SELECT * FROM ${TABLE_NAMES.users}
        ) AS u
        LEFT JOIN
            ${TABLE_NAMES.addresses} AS addr ON addr.id = u.address_id
    `;

        const users: UserResponse[] = (await selectData(
            query,
            []
        )) as UserResponse[];

        const newUsers = users
            .filter(({ username }) => req.tokenPayload.username !== username)
            .map(
                ({
                    password,
                    address_id,
                    address_latitude,
                    address_longitude,
                    place_id,
                    address_name,
                    full_address,
                    ...other
                }) => {
                    if (!address_id) {
                        other.address = undefined;
                        return other;
                    }

                    other.address = {
                        id: address_id,
                        latitude: address_latitude,
                        longitude: address_longitude,
                        place_id: place_id,
                        address_name: address_name,
                        full_address: full_address,
                    };

                    return other;
                }
            );

        sendResponse(
            res,
            STATUS_CODE.OK,
            'Get all users successfully!',
            newUsers
        );
    } catch (error) {
        sendResponse(
            res,
            STATUS_CODE.INTERNAL_SERVER_ERROR,
            'something went wrong'
        );
    }
};
