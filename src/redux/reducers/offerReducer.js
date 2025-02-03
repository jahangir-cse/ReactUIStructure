import { ActionTypes } from "../constants/action-types";

const initialState = {
    items: [],
};

const offerReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_OFFERS:
            return { ...state, items: action.payload };
        case ActionTypes.CREATE_OFFERS:
            return { ...state, items: [...state.items, action.payload] };
        case ActionTypes.UPDATE_OFFERS:
            return {
                ...state,
                items: state.items.map(item =>
                    item.id === action.payload.id ? action.payload : item
                ),
            };
        case ActionTypes.DELETE_OFFERS:
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload),
            };
        default:
            return state;
    }
};

export default offerReducer;
