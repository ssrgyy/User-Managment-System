import { RouteList, RouteNames } from "./types";
import { Login } from "../pages/Login";
import { UserList } from "../pages/UserList";
import { AddUser } from "../pages/AddUser";
import { UserEdit } from "../pages/UserEdit";

export const publicRoutes: RouteList = [
    {path: RouteNames.Login, component: Login, exact: true}
];

export const privateRoutes: RouteList = [
    {path: RouteNames.UserList, component: UserList, exact: true},
    {path: RouteNames.AddUser, component: AddUser, exact: true},
    {path: RouteNames.EditUser, component: UserEdit, exact: true}
];