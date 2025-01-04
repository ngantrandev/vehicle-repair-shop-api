import { CustomRequest } from '@/src/types/requests';
import { Response } from 'express';

import { TABLE_NAMES, ACCOUNT_STATE } from '@/src/configs/constants.config';
import { STATUS_CODE } from '@/src/configs/status.codes.config';
import {
    sendResponse,
    selectData,
    isValidInteger,
    executeTransaction,
    excuteQuery,
} from '@/src/ultil/ultil.lib';
import { ServiceStationResponse, StaffResponse } from '@/src/types/responses';

export const getAllServiceStations = async (
    req: CustomRequest,
    res: Response
) => {
    try {
        const query = `
            SELECT
                ss.id,
                ss.name,
                address.id AS address_id,
                address.latitude,
                address.longitude,
                address.place_id,
                address.address_name,
                address.full_address,
                COUNT(s.id) AS staff_count
                
            FROM
                ${TABLE_NAMES.service_stations} AS ss
            LEFT JOIN
                ${TABLE_NAMES.addresses} AS address ON ss.address_id = address.id
            LEFT JOIN ${TABLE_NAMES.staffs} AS s ON ss.id = s.station_id
            GROUP BY ss.id
        `;

        const serviceStations: ServiceStationResponse[] = (await selectData(
            query,
            []
        )) as ServiceStationResponse[];

        const newServiceStations = serviceStations.map(
            ({
                address_id,
                latitude,
                longitude,
                place_id,
                address_name,
                full_address,
                ...other
            }) => ({
                ...other,
                address: {
                    address_id,
                    latitude,
                    longitude,
                    place_id,
                    address_name,
                    full_address,
                },
            })
        );

        sendResponse(
            res,
            STATUS_CODE.OK,
            'Get all service stations successfully!',
            newServiceStations
        );
    } catch (error: any) {
        sendResponse(res, STATUS_CODE.INTERNAL_SERVER_ERROR, error.message);
    }
};

export const getStationById = async (req: CustomRequest, res: Response) => {
    const { station_id: stationId } = req.params;
    try {
        const query = `
            SELECT
                ss.id,
                ss.name,
                address.id AS address_id,
                address.latitude,
                address.longitude,
                address.place_id,
                address.address_name,
                address.full_address
                
            FROM (
               SELECT * FROM ${TABLE_NAMES.service_stations} WHERE id = ?
            ) AS ss
            LEFT JOIN
                ${TABLE_NAMES.addresses} AS address ON ss.address_id = address.id
        `;

        const serviceStations: ServiceStationResponse[] = (await selectData(
            query,
            [stationId]
        )) as ServiceStationResponse[];

        const {
            address_id,
            latitude,
            longitude,
            place_id,
            address_name,
            full_address,
            ...other
        } = serviceStations[0];

        const station = {
            ...other,
            address: {
                id: address_id,
                latitude,
                longitude,
                place_id,
                address_name,
                full_address,
            },
        };

        sendResponse(
            res,
            STATUS_CODE.OK,
            'Get all service stations successfully!',
            station
        );
    } catch (error: any) {
        sendResponse(res, STATUS_CODE.INTERNAL_SERVER_ERROR, error.message);
    }
};

export const getAllStaffOfServiceStation = async (
    req: CustomRequest,
    res: Response
) => {
    try {
        const { station_id } = req.params;

        if (!station_id) {
            sendResponse(res, STATUS_CODE.BAD_REQUEST, 'missing station_id');
            return;
        }

        if (!isValidInteger(station_id)) {
            sendResponse(
                res,
                STATUS_CODE.BAD_REQUEST,
                'station_id must be an integer'
            );
            return;
        }

        const query = `
            SELECT
                s.*
            FROM ${TABLE_NAMES.staffs} AS s
            WHERE s.station_id = ? AND s.active = ${ACCOUNT_STATE.active}
        `;

        const staffs: StaffResponse[] = (await selectData(query, [
            station_id,
        ])) as StaffResponse[];

        const newStaffs = staffs.map(
            ({ password, station_id, ...other }) => other
        );

        sendResponse(
            res,
            STATUS_CODE.OK,
            'Get all staffs successfully!',
            newStaffs
        );
    } catch (error: any) {
        sendResponse(res, STATUS_CODE.INTERNAL_SERVER_ERROR, error.message);
    }
};

export const updateStation = async (req: CustomRequest, res: Response) => {
    const { station_id: stationId } = req.params;
    const {
        name: stationName,
        address_id: addressId,
        place_id,
        address_name,
        full_address,
        latitude,
        longitude,
    } = req.body;

    try {
        const queries = [
            `UPDATE ${TABLE_NAMES.service_stations} SET name = ? WHERE id = ?`,
            `UPDATE ${TABLE_NAMES.addresses} SET place_id = ?, address_name = ?, full_address = ?, latitude = ?, longitude = ? WHERE id = ?`,
        ];

        const params = [
            [stationName, stationId],
            [
                place_id,
                address_name,
                full_address,
                latitude,
                longitude,
                addressId,
            ],
        ];

        await executeTransaction(queries, params);

        sendResponse(res, STATUS_CODE.OK, 'Update station successfully!');
    } catch (error: any) {
        sendResponse(res, STATUS_CODE.INTERNAL_SERVER_ERROR, error.message);
    }
};

export const createStation = async (req: CustomRequest, res: Response) => {
    const {
        name: stationName,
        place_id: placeId,
        latitude,
        longitude,
        address_name,
        full_address,
    } = req.body;

    try {
        const queries = [
            `INSERT INTO ${TABLE_NAMES.addresses} (place_id, address_name, full_address, latitude, longitude) VALUES (?, ?, ?, ?, ?);`,
            'SET @address_id = LAST_INSERT_ID();',
            `INSERT INTO ${TABLE_NAMES.service_stations} (name, address_id) VALUES (?, @address_id);`,
        ];

        const params = [
            [placeId, address_name, full_address, latitude, longitude],
            [],
            [stationName],
        ];

        await executeTransaction(queries, params);

        sendResponse(res, STATUS_CODE.OK, 'Create station successfully!');
    } catch (error: any) {
        console.log(error.message);
        sendResponse(res, STATUS_CODE.INTERNAL_SERVER_ERROR, error);
    }
};

export const deleteStation = async (req: CustomRequest, res: Response) => {
    const { station_id: stationId } = req.params;

    try {
        const query = `DELETE FROM ${TABLE_NAMES.service_stations} WHERE id = ?`;

        await excuteQuery(query, [stationId]);

        sendResponse(res, STATUS_CODE.OK, 'Delete station successfully!');
    } catch (error: any) {
        sendResponse(res, STATUS_CODE.INTERNAL_SERVER_ERROR, error.message);
    }
};

const stationController = {
    getAllServiceStations,
    getAllStaffOfServiceStation,
    getStationById,
    updateStation,
    createStation,
    deleteStation,
};

module.exports = stationController;
