import { ComponentType } from "react";

export interface RouteData {
    path: string;
    exact?: boolean;
    component: ComponentType;
}

export type RouteList = RouteData[];

export enum RouteNames {
    Login = '/login',
    UserList = '/user_list',
    AddUser = '/add_user',
    EditUser = '/edit_user'
}