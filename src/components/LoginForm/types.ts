import { User } from "../UserManager/types";

export type LoginFormResponseData = User;

export interface LoginFormRequestData {
    login: string;
    password: string;
}