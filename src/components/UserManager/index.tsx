import React, { useEffect, useReducer } from "react";
import axios from "axios";
import { City } from "./types";
import { UserManagerContext } from "./UserManagerContext";
import { userManagerReducer, userManagerState } from "./userManagerReducer";
import { UserManagerActionTypes, UserManagerReducer } from "./userManagerReducer/types";

export const UserManager: React.FC = ({children}) => {
    const [state, dispatch] = useReducer<UserManagerReducer>(userManagerReducer, userManagerState);

    useEffect(() => {
        axios.post<City[]>('http://localhost:5000/cities').then(res => {
            if (res.data.length === 0)
                return;

            dispatch({
                type: UserManagerActionTypes.SET_CITY_LIST,
                payload: res.data
            })
        });
    }, []);

    return (
        <UserManagerContext.Provider value={{
            userManagerState: state,
            userManagerDispatch: dispatch
        }}>
            {children}
        </UserManagerContext.Provider>
    );
}