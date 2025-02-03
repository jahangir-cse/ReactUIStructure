import { ActionTypes } from "../constants/action-types";

const initialState = {
    items: [],
};

const bundleTypeReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_BUNDLE_TYPES:
            return { ...state, items: action.payload };
        case ActionTypes.CREATE_BUNDLE_TYPES:
            return { ...state, items: [...state.items, action.payload] };
        case ActionTypes.UPDATE_BUNDLE_TYPES:
            return {
                ...state,
                items: state.items.map(item =>
                    item.id === action.payload.id ? action.payload : item
                ),
            };
        case ActionTypes.DELETE_BUNDLE_TYPES:
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload),
            };
        default:
            return state;
    }
};

export default bundleTypeReducer;
