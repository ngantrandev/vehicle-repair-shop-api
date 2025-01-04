import { Booking, Service, Staff, User } from '@/src/types/models';

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
}

export interface ServiceResponse extends Service {
    category_name: string;
}

export interface BookingResponse extends Booking {
    address_latitude: number;
    address_longitude: number;
    service_name: string;
}
