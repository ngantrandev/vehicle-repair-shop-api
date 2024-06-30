const APP_NAME = 'Vehicle Repair Shop API';

const BASE_URL_PATH = '/v1/api';

const TABLE_NAMES = {
    users: 'users',
    staffs: 'staffs',
    service_stations: 'service_stations',
    services: 'services',
    service_categories: 'service_categories',
    service_motorcycles: 'service_motorcycles',
    spare_parts_services: 'spare_parts_services',
};

const USER_ROLES = {
    admin: 'admin',
    customer: 'customer',
    staff: 'staff',
};

module.exports = { APP_NAME, TABLE_NAMES, USER_ROLES, BASE_URL_PATH };
