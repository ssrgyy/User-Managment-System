import { Dispatch } from "react";
import { UserManagerAction, UserManagerState } from "../userManagerReducer/types";

export interface UserManagerContextProviderData {
    userManagerState: UserManagerState;
    userManagerDispatch: Dispatch<UserManagerAction>;
}