import {
    Booking,
    Invoice,
    Notification,
    Service,
    Staff,
    Station,
    User,
} from '@/src/types/models';

export interface UserResponse extends User {
    address_id?: number;
    address_latitude: number;
    address_longitude: number;
    place_id: string;
    address_name: string;
    full_address: string;
}

export interface StaffResponse extends Staff {
    station_id?: number;
    service_station_name: string;
    service_station: Station;
}

export interface ServiceResponse extends Service {
    category_name: string;
    category_desc: string;
}

export interface BookingResponse extends Booking {
    address_latitude?: number;
    address_longitude?: number;
    service_name?: string;
    service_price?: number;
    service_image_url?: string;
    service_estimated_time?: string;
    address_name: string;
    full_address: string;
    user_firstname: string;
    user_lastname: string;
    user_email: string;
    user_phone: string;
    station_id: number;
    station_name: string;
    station_longitude: number;
    station_latitude: number;
    station_address: string;
    station_address_name: string;
    staff_id: number;
    staff_firstname: string;
    staff_lastname: string;
    items_price?: number;
    is_paid: boolean;
}

export interface NotificationResponse extends Notification {
    is_read: number;
}

export interface ServiceStationResponse extends Station {
    address_id: number;
    latitude: number;
    longitude: number;
    place_id: string;
    address_name: string;
    full_address: string;
    staff_count: number;
}

export interface InvoiceResponse extends Invoice {
    p_txn_ref: string;
}
