import { UUID } from "../../uuid/types";

export interface LoadUserRequestData {
    elementsOnPage: number;
    page: number;
}

export interface DeleteUserRequestData {
    id: UUID;
}