import React, { useContext, useEffect, useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { authProviderReducer, authProviderState } from "./authProviderReducer";
import { AuthProviderReducer, AuthProviderTypes } from "./authProviderReducer/types";

export const AuthProvider: React.FC = ({children}) => {
    const [state, dispatch] = useReducer<AuthProviderReducer>(authProviderReducer, authProviderState);

    useEffect(() => {
        
    }, []);

    return (
        <AuthContext.Provider value={
            {authProviderState: state,
            authProviderDispatch: dispatch}}>
                {children}
        </AuthContext.Provider>
    );
}