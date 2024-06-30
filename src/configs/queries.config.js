const { TABLE_NAMES } = require('./constants.config');

const QUERY_SELECT_SERVICE_BY_ID = `
            SELECT ${TABLE_NAMES.services}.*, ${TABLE_NAMES.service_categories}.name AS category_name, ${TABLE_NAMES.service_categories}.description AS category_desc 
            FROM ${TABLE_NAMES.services}
            JOIN ${TABLE_NAMES.service_categories}
            ON ${TABLE_NAMES.services}.category_id = ${TABLE_NAMES.service_categories}.id
            WHERE ${TABLE_NAMES.services}.id = ?
        `;

module.exports = { QUERY_SELECT_SERVICE_BY_ID };
