import { ActionTypes } from "../constants/action-types";

const initialState = {
    items: [],
};

const settingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_SETTINGS:
            return { ...state, items: action.payload };

        case ActionTypes.CREATE_SETTING:
            return {
                ...state,
                items: [...state.items, action.payload]
            };

        case ActionTypes.UPDATE_SETTING:
            return {
                ...state,
                items: state.items.map(item =>
                    item.id === action.payload.id ? action.payload : item
                ),
            };
        default:
            return state;
    }
};

export default settingsReducer;
