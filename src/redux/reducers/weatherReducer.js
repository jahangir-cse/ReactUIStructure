import { ActionTypes } from "../constants/action-types";

const initialState = {
    items: [],
};

const weatherReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_WEATHERS:
            return { ...state, items: action.payload };
        default:
            return state;
    }
};

export default weatherReducer;
