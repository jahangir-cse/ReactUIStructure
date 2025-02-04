import { ActionTypes } from '../constants/action-types';

const initialState = {
    accessToken: null,
    refreshToken: null,
    expiredAt: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.SIGN_IN:
            return {
                ...state,
                accessToken: action.payload.token,
                refreshToken: action.payload.refreshToken,
                expiredAt: Date.now() + action.payload.expiresIn || 3600 * 1000,
            };
        case ActionTypes.SIGN_OUT:
            return {
                ...state,
                accessToken: null,  // Clear token from Redux state
            };
        case ActionTypes.REFRESH_TOKEN:
            return {
                ...state,
                accessToken: action.payload.token,
                refreshToken: action.payload.refreshToken,
                expiredAt: Date.now() + action.payload.expiresIn || 3600 * 1000,
            };
        default:
            return state;
    }
};

export default authReducer;
