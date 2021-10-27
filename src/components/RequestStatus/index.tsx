import React, { useReducer } from "react";
import { RequestStatusContext } from "./RequestStatusContext";
import { requestStatusReducer, requestStatusState } from "./requestStatusReducer";
import { RequestStatusReducer } from "./requestStatusReducer/types";

export const RequestStatus: React.FC = ({children}) => {
    const [state, dispatch] = useReducer<RequestStatusReducer>(requestStatusReducer, requestStatusState);

    return (
        <RequestStatusContext.Provider value={{
            requestStatusState: state,
            requestStatusDispatch: dispatch
        }}>
            {children}
        </RequestStatusContext.Provider>
    );
}