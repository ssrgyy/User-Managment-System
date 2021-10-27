import { UserData } from "../../components/UserManager/types";
import { UUID } from "../../uuid/types";

export interface LoadUserResponseData {
    page: number;
    pageData: UserData[];
}

export interface LoadUserRequestData {
    elementsOnPage: number;
    page: number;
}

export interface DeleteUserRequestData {
    userId: UUID;
}