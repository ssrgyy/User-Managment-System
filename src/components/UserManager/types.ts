import { UUID } from "../../uuid/types";

export type UserId = UUID;
export type UserFio = string;
export type CityId = UUID;
export type CityName = string;

export interface User {
    id: UserId;
    fio: UserFio;
    cityId: CityId;
}

export interface City {
    id: CityId;
    name: CityName;
}

export interface UserData {
    user: User;
    city: City;
}