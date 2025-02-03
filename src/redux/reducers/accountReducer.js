import { ActionTypes } from "../constants/action-types";

const initialState = {
    items: [],
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_USERS:
            return { ...state, items: action.payload };
        case ActionTypes.CREATE_USER:
            return { ...state, items: [...state.items, action.payload] };
        case ActionTypes.UPDATE_USER:
            return {
                ...state,
                items: state.items.map(item =>
                    item.id === action.payload.id ? action.payload : item
                ),
            };
        case ActionTypes.DELETE_USER:
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload),
            };
        case ActionTypes.GET_BY_ID_USER:
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload),
            };
        case ActionTypes.GET_USER:
            return { ...state, items: action.payload };
        default:
            return state;
    }
};

export default userReducer;
