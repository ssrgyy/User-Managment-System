import { Reducer } from "react";
import { City, UserData } from "../types";

export type SelectedUser = UserData;

export interface UserManagerState {
    cityList: City[];
    selectedUser?: UserData;
}

export enum UserManagerActionTypes {
    SELECT_USER = 'SELECT_USER',
    SET_CITY_LIST = 'SET_CITY_LIST'
}

export type UserManagerSelectUserPayload = SelectedUser;

export interface UserManagerSelectUserAction {
    type: UserManagerActionTypes.SELECT_USER;
    payload: UserManagerSelectUserPayload;
}

export type UserManagerSetCityPayload = City[];

export interface UserManagerSetCityListAction {
    type: UserManagerActionTypes.SET_CITY_LIST;
    payload: UserManagerSetCityPayload;
}

export type UserManagerAction = 
    UserManagerSelectUserAction
    | UserManagerSetCityListAction;

export type UserManagerReducer = Reducer<UserManagerState, UserManagerAction>;