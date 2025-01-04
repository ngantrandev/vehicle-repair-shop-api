export const APP_NAME: string = 'Vehicle Repair Shop API';

export const BASE_URL_PATH: string = '/v1/api';

export const TABLE_NAMES = {
    users: 'users',
    staffs: 'staffs',
    service_stations: 'service_stations',
    services: 'services',
    service_categories: 'service_categories',
    service_motorcycles: 'service_motorcycles',
    addresses: 'goong_map_addresses',
    motorcycle_brands: 'motorcycle_brands',
    motorcycles: 'motorcycles',
    bookings: 'bookings',
    notifications: 'notifications',
    notifications_users: 'notifications_users',
    items: 'items',
    bookings_items: 'bookings_items',
    services_items: 'services_items',
    invoices: 'invoices',
    payments: 'payments',
    inputs: 'inputs',
    input_info: 'input_info',
    outputs: 'outputs',
    output_info: 'output_info',
};

export const USER_ROLES = {
    admin: 'admin',
    customer: 'customer',
    staff: 'staff',
};

export const ACCOUNT_STATE = {
    active: 1,
    deactive: 0,
};

export const BOOKING_STATE = {
    pending: 'pending',
    accepted: 'accepted',
    fixing: 'fixing',
    done: 'done',
    cancelled: 'cancelled',
};

export const PAYMENT_TYPE = {
    cash: 'cash',
    vnpay: 'vnpay',
};

export const PAYMENT_STATUS = {
    pending: 'pending',
    success: 'success',
    fail: 'fail',
    refund: 'refund',
};
