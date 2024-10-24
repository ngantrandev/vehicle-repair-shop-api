const { TABLE_NAMES } = require('./constants.config');

const QUERY_SELECT_SERVICE_BY_ID = `
            SELECT
                ${TABLE_NAMES.services}.*,
                ${TABLE_NAMES.service_categories}.name AS category_name,
                ${TABLE_NAMES.service_categories}.description AS category_desc
            FROM ${TABLE_NAMES.services}
            JOIN ${TABLE_NAMES.service_categories}
            ON ${TABLE_NAMES.services}.category_id = ${TABLE_NAMES.service_categories}.id
            WHERE ${TABLE_NAMES.services}.id = ?
        `;

const QUERY_SELECT_STAFF_BY_ID = `
    SELECT
        s.*,
        ss.name AS service_station_name
    FROM ${TABLE_NAMES.staffs} AS s
    JOIN ${TABLE_NAMES.service_stations} AS ss
        ON s.station_id = ss.id
    WHERE s.id = ?
`;

const QUERY_SELECT_USER_BY_ID = `
    SELECT
        u.*,
        addr.street AS address_street,
        addr.latitude AS address_latitude,
        addr.longitude AS address_longitude,
        w.id AS ward_id,
        w.name AS ward_name,
        d.id AS district_id,
        d.name AS district_name,
        p.id AS province_id,
        p.name AS province_name

    FROM ${TABLE_NAMES.users} AS u
    LEFT JOIN
        ${TABLE_NAMES.addresses} AS addr ON addr.id = u.address_id
    LEFT JOIN
        ${TABLE_NAMES.wards} AS w ON w.id = addr.ward_id
    LEFT JOIN
        ${TABLE_NAMES.districts} AS d ON d.id = w.district_id
    LEFT JOIN
        ${TABLE_NAMES.provinces} AS p ON p.id = d.province_id
    WHERE u.id = ?

`;

const QUERY_SELECT_USER_BY_USERNAME = `
    SELECT
        u.*,
        addr.latitude AS address_latitude,
        addr.longitude AS address_longitude,
        addr.id AS address_id,
        addr.place_id AS place_id,
        addr.address_name AS address_name,
        addr.full_address AS full_address
    FROM (
        SELECT * FROM ${TABLE_NAMES.users} WHERE username = ?
    ) AS u
    LEFT JOIN
        ${TABLE_NAMES.addresses} AS addr ON addr.id = u.address_id

`;

module.exports = {
    QUERY_SELECT_SERVICE_BY_ID,
    QUERY_SELECT_STAFF_BY_ID,
    QUERY_SELECT_USER_BY_ID,
    QUERY_SELECT_USER_BY_USERNAME,
};
