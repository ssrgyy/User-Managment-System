import { UUID } from "../../uuid/types";
import { UserFio } from "../UserManager/types";

export interface LoginFormResponseData {
    regId: UUID;
    userFio: UserFio;
}

export interface LoginFormRequestData {
    login: string;
    password: string;
}