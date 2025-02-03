import { ActionTypes } from "../constants/action-types";

const initialState = {
    items: [],
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.LOG_IN:
            return { ...state, items: action.payload };
        default:
            return state;
    }
};

export default userReducer;
