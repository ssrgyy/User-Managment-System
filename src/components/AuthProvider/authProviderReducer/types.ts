import { Reducer } from "react";
import { UUID } from "../../../uuid/types";

export interface AuthProviderState {
    isAuth: boolean;
    userId?: string;
    userFio?: string;
}

export enum AuthProviderTypes {
    LOGIN = 'LOGIN',
    LOGOUT = 'LOGOUT'
}

export interface AuthProviderLoginPayload {
    userId: UUID;
    userFio: string;
}

export interface AuthProviderLoginAction {
    type: AuthProviderTypes.LOGIN;
    payload: AuthProviderLoginPayload;
}

export interface AuthProviderLogoutAction {
    type: AuthProviderTypes.LOGOUT;
}

export type AuthProviderAction =
    AuthProviderLoginAction
    | AuthProviderLogoutAction;

export type AuthProviderReducer = Reducer<AuthProviderState, AuthProviderAction>;
export type AuthProviderFunc = (state: AuthProviderState) => AuthProviderState;