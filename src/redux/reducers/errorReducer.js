import { ActionTypes } from '../constants/action-types';

const initialState = {
    error: null,
};

const errorReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.SIGN_IN_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        case ActionTypes.CLEAR_ERROR:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

export default errorReducer;
