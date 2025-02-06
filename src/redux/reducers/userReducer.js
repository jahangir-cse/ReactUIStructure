import { ActionTypes } from "../constants/action-types";

const initialState = {
    items: [],
    roles: [],
    user: null,
    accessToken: null,
    refreshToken: null,
    expiredAt: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_USERS:
            return { ...state, items: action.payload };

        case ActionTypes.FETCH_ROLES:
            return { ...state, roles: action.payload };

        case ActionTypes.CREATE_USER:
            return {
                ...state,
                items: [...state.items, action.payload]
            };

        case ActionTypes.UPDATE_USER:
            return {
                ...state,
                items: state.items.map(user =>
                    user.id === action.payload.id ? action.payload : user
                ),
            };

        case ActionTypes.UPDATE_USER_PROFILE:
            return {
                ...state,
                user: action.payload,
            };

        case ActionTypes.DELETE_USER:
            return {
                ...state,
                items: state.items.filter(user => user.id !== action.payload),
            };

        case ActionTypes.GET_BY_NUMBER_USER:
            return {
                ...state,
                user: action.payload,
            };

        default:
            return state;
    }
};

export default userReducer;
