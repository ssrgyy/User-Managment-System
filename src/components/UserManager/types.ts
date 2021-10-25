import { UUID } from "../../uuid/types";

export interface User {
    id: UUID;
    fio: string;
    cityId: UUID;
}

export interface City {
    id: UUID;
    name: string;
}

export interface UserData {
    user: User;
    city: City;
}

export type UserManagerState = UserData | undefined;