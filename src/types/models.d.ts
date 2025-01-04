export interface Address {
    id?: number;
    place_id: string;
    address_name: string;
    full_address: string;
    latitude: number;
    longitude: number;
}

export interface Person {
    id: number;
    username: string;
    firstname: string;
    lastname: string;
    birthday: string;
    image_url: string;
    email: string;
    phone: string;
}

export interface User extends Person {
    password: string;
    address?: Address;
    role: string;
    created_at: string;
    active: number;
}

export interface Staff extends Person {
    password: string;
    created_at: string;
    active: number;
    service_station?: Station;
}

export interface Station {
    id: number;
    name: string;
    address?: Address;
}

export interface Category {
    id: number;
    name: string;
    description: string;
}

export interface Service {
    id: number;
    category_id?: number;
    name: string;
    description: string;
    price: number;
    estimated_time: string;
    image_url: string;
    active: number;
}

interface Booking {
    id: number;
    service_id: number;
    user_id: number;
    created_at: string;
    modified_at: string;
    address_id: number;
    status: string;
    pre_status: string;
    note: string;
    staff_id: number;
    image_url: string;
}

export interface Service {
    id: number;
    category_id: number;
    name: string;
    description: string;
    price: number;
    estimated_time: string;
    image_url: string;
    active: number;
}
