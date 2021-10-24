import { Dispatch } from "react";
import { AuthProviderAction, AuthProviderState } from "../authProviderReducer/types";

export interface AuthContextProviderValue {
    authProviderState: AuthProviderState;
    authProviderDispatch: Dispatch<AuthProviderAction>;
}