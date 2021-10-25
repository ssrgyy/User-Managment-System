import React, { useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { authProviderReducer, authProviderState } from "./authProviderReducer";
import { AuthProviderReducer } from "./authProviderReducer/types";

export const AuthProvider: React.FC = ({children}) => {
    const [state, dispatch] = useReducer<AuthProviderReducer>(authProviderReducer, authProviderState);    

    return (
        <AuthContext.Provider value={
            {authProviderState: state,
            authProviderDispatch: dispatch}}>
                {children}
        </AuthContext.Provider>
    );
}