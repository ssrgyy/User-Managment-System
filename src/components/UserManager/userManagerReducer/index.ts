import { UserManagerActionTypes, UserManagerReducer, UserManagerSelectUserPayload, UserManagerSetCityPayload, UserManagerState } from "./types";

export const userManagerState: UserManagerState = {
    cityList: []
};

const selectUser = (state: UserManagerState, selectedUser: UserManagerSelectUserPayload): UserManagerState => {
    return {...state, selectedUser};
}

const setCityList = (state: UserManagerState, cityList: UserManagerSetCityPayload): UserManagerState => {
    return {...state, cityList};
}

export const userManagerReducer: UserManagerReducer = (state, action) => {
    switch (action.type) {
        case UserManagerActionTypes.SELECT_USER:
            return selectUser(state, action.payload);
        
        case UserManagerActionTypes.SET_CITY_LIST:
            return setCityList(state, action.payload);

        default: return state;
    }
}