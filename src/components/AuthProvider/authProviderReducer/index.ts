import { AuthProviderFunc, AuthProviderReducer, AuthProviderState, AuthProviderTypes } from "./types";

export const authProviderState: AuthProviderState = {
    isAuth: true
};

export const login: AuthProviderFunc = (state, payload) => {
    return {...state, isAuth: true};
}

export const logout: AuthProviderFunc = (state, payload) => {
    return {...state, isAuth: false};
}

export const authProviderReducer: AuthProviderReducer = (state, action) => {
    const call = (func: AuthProviderFunc) => func(state, action);

    switch(action.type) {
        case AuthProviderTypes.LOGIN:
            return call(login);

        case AuthProviderTypes.LOGOUT:
            return call(logout);

        default: return state;
    }
}