import { City, User } from "../../components/UserManager/types";

export interface UserListResponseDataObject {
    user: User;
    city: City;
}

export type UserListResponseData = UserListResponseDataObject[];