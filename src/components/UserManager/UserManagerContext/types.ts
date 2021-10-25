import { Dispatch, SetStateAction } from "react";
import { UserManagerState } from "../types";

export interface UserManagerContextProviderData {
    currentUser: UserManagerState;
    setCurrentUser: Dispatch<SetStateAction<UserManagerState>>;
}