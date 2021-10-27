import { Dispatch } from "react";
import { RequestStatusSetLoadingStatusAction, RequestStatusState } from "../requestStatusReducer/types";

export interface RequestStatusContextValue {
    requestStatusState: RequestStatusState;
    requestStatusDispatch: Dispatch<RequestStatusSetLoadingStatusAction>;
}