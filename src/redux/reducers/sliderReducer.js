import { ActionTypes } from "../constants/action-types";

const initialState = {
    items: [],
};

const sliderReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_SLIDERS:
            return { ...state, items: action.payload };

        case ActionTypes.CREATE_SLIDER:
            return {
                ...state,
                items: [...state.items, action.payload]
            };

        case ActionTypes.UPDATE_SLIDER:
            return {
                ...state,
                items: state.items.map(item =>
                    item.id === action.payload.id ? action.payload : item
                ),
            };

        case ActionTypes.DELETE_SLIDER:
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload),
            };
        default:
            return state;
    }
};

export default sliderReducer;
