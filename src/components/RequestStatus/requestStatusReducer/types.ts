import { Reducer } from "react";

export interface RequestStatusState {
    isLoading: boolean;
}

export enum RequestStatusActionTypes {
    SET_LOADING_STATUS = 'SET_LOADING_STATUS'
}

export type RequestStatussSetLoadingStatusPayload = boolean;

export interface RequestStatusSetLoadingStatusAction {
    type: RequestStatusActionTypes.SET_LOADING_STATUS;
    payload: RequestStatussSetLoadingStatusPayload;
}

export type RequestStatusAction = RequestStatusSetLoadingStatusAction;

export type RequestStatusReducer = Reducer<RequestStatusState, RequestStatusAction>;