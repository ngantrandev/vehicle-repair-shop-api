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
    addresses: 'goong_map_addresses',
    motorcycle_brands: 'motorcycle_brands',
    motorcycles: 'motorcycles',
    carts: 'carts',
    bookings: 'bookings',
    wards: 'wards',
    districts: 'districts',
    provinces: 'provinces',
    notifications: 'notifications',
    user_notifications: 'user_notifications',
    staff_notifications: 'staff_notifications',
};

const USER_ROLES = {
    admin: 'admin',
    customer: 'customer',
    staff: 'staff',
};

const ACCOUNT_STATE = {
    active: '1',
    deactive: '0',
};

const BOOKING_STATE = {
    pending: 'pending',
    accepted: 'accepted',
    fixing: 'fixing',
    done: 'done',
    cancelled: 'cancelled',
};

module.exports = {
    APP_NAME,
    TABLE_NAMES,
    USER_ROLES,
    BASE_URL_PATH,
    ACCOUNT_STATE,
    BOOKING_STATE,
};
