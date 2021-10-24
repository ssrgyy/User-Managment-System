type UUID = string;

export interface User {
    id: UUID;
    fio: string;
    cityId: UUID;
}

export interface City {
    id: UUID;
    name: string;
}