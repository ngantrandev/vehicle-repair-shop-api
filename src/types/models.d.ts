export interface Address {
    id?: number;
    place_id?: string;
    address_name?: string;
    full_address?: string;
    latitude?: number;
    longitude?: number;
}

export interface Person {
    id?: number;
    username?: string;
    firstname?: string;
    lastname?: string;
    birthday?: string;
    image_url?: string;
    email?: string;
    phone?: string;
}

export interface User extends Person {
    password?: string | undefined;
    address?: Address;
    role?: string;
    created_at?: string;
    active?: number;
}

export interface Staff extends Person {
    password?: string;
    created_at?: string;
    active?: number;
    station?: Station;
    role?: string;
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
    id?: number;
    category_id?: number;
    name?: string;
    description?: string;
    price?: number;
    estimated_time?: string;
    image_url?: string;
    active?: number;
    category?: Category;
}

export interface Booking {
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
    user: User;
    service: Service;
    address: Address;
    staff: Staff;
    is_paid: boolean | number;
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

export interface Notification {
    id: number;
    title: string;
    message: string;
    date: string;
}

export interface Item {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

export interface Invoice {
    items: any[];
    service: Service;
    booking_id: string;
    full_address: string;
    user: any;
}
