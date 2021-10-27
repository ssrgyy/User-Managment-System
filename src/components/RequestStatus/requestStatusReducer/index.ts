import { RequestStatusActionTypes, RequestStatusReducer, RequestStatussSetLoadingStatusPayload, RequestStatusState } from "./types";

export const requestStatusState: RequestStatusState = {
    isLoading: false
}

const setLoadingStatus = (state: RequestStatusState,
    isLoading: RequestStatussSetLoadingStatusPayload): RequestStatusState => {
        return {...state, isLoading};
    }

export const requestStatusReducer: RequestStatusReducer = (state, action) => {
    switch (action.type) {
        case RequestStatusActionTypes.SET_LOADING_STATUS:
            return setLoadingStatus(state, action.payload);

        default: return state;
    }
}