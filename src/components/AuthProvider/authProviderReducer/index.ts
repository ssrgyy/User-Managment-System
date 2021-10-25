import { AuthProviderFunc, AuthProviderLoginPayload, AuthProviderReducer, AuthProviderState, AuthProviderTypes } from "./types";

export const authProviderState: AuthProviderState = {
    isAuth: false
};

export const login = (state: AuthProviderState, payload: AuthProviderLoginPayload): AuthProviderState => {
    return {...state, ...payload, isAuth: true};
}

export const logout: AuthProviderFunc = (state) => {
    return {isAuth: false};
}

export const authProviderReducer: AuthProviderReducer = (state, action) => {

    switch(action.type) {
        case AuthProviderTypes.LOGIN:
            return login(state, action.payload);

        case AuthProviderTypes.LOGOUT:
            return logout(state);

        default: return state;
    }
}