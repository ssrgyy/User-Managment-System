import { useEffect } from "react";
import { RequestStatusActionTypes } from "../components/RequestStatus/requestStatusReducer/types";
import { useRequestStatus } from "./useRequestStatus";

export const useLoading = () => {
    const {requestStatusState, requestStatusDispatch} = useRequestStatus();

    useEffect(() => () => setStatusLoaded(), []);

    const setStatusLoading = () => {
        requestStatusDispatch({
            type: RequestStatusActionTypes.SET_LOADING_STATUS,
            payload: true
        });
    }

    const setStatusLoaded = () => {
        requestStatusDispatch({
            type: RequestStatusActionTypes.SET_LOADING_STATUS,
            payload: false
        });
    }

    return {
        isLoading: requestStatusState.isLoading,
        setStatusLoading,
        setStatusLoaded
    };
}