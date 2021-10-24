import { Reducer } from "react";

export interface AuthProviderState {
    isAuth: boolean;
    id?: string;
    name?: string;
}

export enum AuthProviderTypes {
    LOGIN = 'LOGIN',
    LOGOUT = 'LOGOUT'
}

export interface AuthProviderLoginAction {
    type: AuthProviderTypes.LOGIN;
}

export interface AuthProviderLogoutAction {
    type: AuthProviderTypes.LOGOUT;
}

export type AuthProviderAction =
    AuthProviderLoginAction
    | AuthProviderLogoutAction;

export type AuthProviderReducer = Reducer<AuthProviderState, AuthProviderAction>;
export type AuthProviderFunc = AuthProviderReducer;