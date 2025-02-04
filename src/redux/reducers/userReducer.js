import { ActionTypes } from "../constants/action-types";

const initialState = {
    items: [],
    accessToken: null,
    refreshToken: null,
    expiredAt: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.LOG_IN:
            return { ...state, items: action.payload };
        case ActionTypes.LOG_OUT:
            return {
                ...state,
                accessToken: null,
            };
        case ActionTypes.REFRESH_TOKEN:
            return {
                ...state,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
                expiredAt: Date.now() + action.payload.expiresIn * 1000,
            };
        default:
            return state;
    }
};

export default userReducer;
