const { TABLE_NAMES, ACCOUNT_STATE } = require('../configs/constants.config');
const { STATUS_CODE } = require('../configs/status.codes.config');
const {
    sendResponse,
    selectData,
    isValidInteger,
    executeTransaction,
    excuteQuery,
} = require('../ultil/ultil.lib');

const getAllServiceStations = async (req, res) => {
    try {
        const query = `
            SELECT
                ss.id,
                ss.name,
                address.id AS address_id,
                address.latitude,
                address.longitude,
                address.street,
                ward.id AS ward_id,
                ward.name AS ward_name,
                district.id AS district_id,
                district.name AS district_name,
                province.id AS province_id,
                province.name AS province_name
                
            FROM
                ${TABLE_NAMES.service_stations} AS ss
            JOIN
                ${TABLE_NAMES.addresses} AS address ON ss.address_id = address.id
            LEFT JOIN
                ${TABLE_NAMES.wards} AS ward ON address.ward_id = ward.id
            LEFT JOIN
                ${TABLE_NAMES.districts} AS district ON ward.district_id = district.id
            LEFT JOIN
                ${TABLE_NAMES.provinces} AS province ON district.province_id = province.id
        `;

        const serviceStations = await selectData(query, []);

        const newServiceStations = serviceStations.map(
            ({
                address_id,
                latitude,
                longitude,
                street,
                ward_name,
                district_name,
                province_name,
                ward_id,
                district_id,
                province_id,
                ...other
            }) => ({
                ...other,
                address: {
                    id: address_id,
                    latitude,
                    longitude,
                    street,
                    ward: {
                        id: ward_id,
                        name: ward_name,
                    },
                    district: {
                        id: district_id,
                        name: district_name,
                    },
                    province: {
                        id: province_id,
                        name: province_name,
                    },
                },
            })
        );

        sendResponse(
            res,
            STATUS_CODE.OK,
            'Get all service stations successfully!',
            newServiceStations
        );
    } catch (error) {
        sendResponse(res, STATUS_CODE.INTERNAL_SERVER_ERROR, error.message);
    }
};

const getStationById = async (req, res) => {
    const { station_id: stationId } = req.params;
    try {
        const query = `
            SELECT
                ss.id,
                ss.name,
                address.id AS address_id,
                address.latitude,
                address.longitude,
                address.street,
                ward.id AS ward_id,
                ward.name AS ward_name,
                district.id AS district_id,
                district.name AS district_name,
                province.id AS province_id,
                province.name AS province_name
                
            FROM
                ${TABLE_NAMES.service_stations} AS ss
            JOIN
                ${TABLE_NAMES.addresses} AS address ON ss.address_id = address.id
            LEFT JOIN
                ${TABLE_NAMES.wards} AS ward ON address.ward_id = ward.id
            LEFT JOIN
                ${TABLE_NAMES.districts} AS district ON ward.district_id = district.id
            LEFT JOIN
                ${TABLE_NAMES.provinces} AS province ON district.province_id = province.id

            WHERE ss.id = ?
        `;

        const serviceStations = await selectData(query, [stationId]);

        const {
            address_id,
            latitude,
            longitude,
            street,
            ward_name,
            district_name,
            province_name,
            ward_id,
            district_id,
            province_id,
            ...other
        } = serviceStations[0];

        const station = {
            ...other,
            address: {
                id: address_id,
                latitude,
                longitude,
                street,
                ward: {
                    id: ward_id,
                    name: ward_name,
                },
                district: {
                    id: district_id,
                    name: district_name,
                },
                province: {
                    id: province_id,
                    name: province_name,
                },
            },
        };

        sendResponse(
            res,
            STATUS_CODE.OK,
            'Get all service stations successfully!',
            station
        );
    } catch (error) {
        sendResponse(res, STATUS_CODE.INTERNAL_SERVER_ERROR, error.message);
    }
};

const getAllStaffOfServiceStation = async (req, res) => {
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

        const staffs = await selectData(query, [station_id]);

        const newStaffs = staffs.map(
            ({ password, station_id, ...other }) => other
        );

        sendResponse(
            res,
            STATUS_CODE.OK,
            'Get all staffs successfully!',
            newStaffs
        );
    } catch (error) {
        sendResponse(res, STATUS_CODE.INTERNAL_SERVER_ERROR, error.message);
    }
};

const updateStation = async (req, res) => {
    const { station_id: stationId } = req.params;
    const {
        name: stationName,
        address_id: addressId,
        street: stationStreet,
        ward_id: wardId,
        latitude,
        longitude,
    } = req.body;

    try {
        const queries = [
            `UPDATE ${TABLE_NAMES.service_stations} SET name = ? WHERE id = ?`,
            `UPDATE ${TABLE_NAMES.addresses} SET street = ?, ward_id = ?, latitude = ?, longitude = ? WHERE id = ?`,
        ];

        const params = [
            [stationName, stationId],
            [stationStreet, wardId, latitude, longitude, addressId],
        ];

        await executeTransaction(queries, params);

        sendResponse(res, STATUS_CODE.OK, 'Update station successfully!');
    } catch (error) {
        sendResponse(res, STATUS_CODE.INTERNAL_SERVER_ERROR, error.message);
    }
};

const createStation = async (req, res) => {
    const {
        name: stationName,
        street: stationStreet,
        ward_id: wardId,
        latitude,
        longitude,
    } = req.body;

    console.log(req.body);

    try {
        const queries = [
            `INSERT INTO ${TABLE_NAMES.addresses} (street, ward_id, latitude, longitude) VALUES (?, ?, ?, ?);`,
            'SET @address_id = LAST_INSERT_ID();',
            `INSERT INTO ${TABLE_NAMES.service_stations} (name, address_id) VALUES (?, @address_id);`,
        ];

        console.log(queries);

        const params = [
            [stationStreet, wardId, latitude, longitude],
            [],
            [stationName],
        ];

        await executeTransaction(queries, params);

        sendResponse(res, STATUS_CODE.OK, 'Create station successfully!');
    } catch (error) {
        sendResponse(res, STATUS_CODE.INTERNAL_SERVER_ERROR, error);
    }
};

const deleteStation = async (req, res) => {
    const { station_id: stationId } = req.params;

    try {
        const query = `DELETE FROM ${TABLE_NAMES.service_stations} WHERE id = ?`;

        await excuteQuery(query, [stationId]);

        sendResponse(res, STATUS_CODE.OK, 'Delete station successfully!');
    } catch (error) {
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
