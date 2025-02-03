import { ActionTypes } from "../constants/action-types";

const initialState = {
    items: [],
};

const noticeReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_NOTICES:
            return { ...state, items: action.payload };
        case ActionTypes.CREATE_NOTICE:
            return { ...state, items: [...state.items, action.payload] };
        case ActionTypes.UPDATE_NOTICE:
            return {
                ...state,
                items: state.items.map(item =>
                    item.id === action.payload.id ? action.payload : item
                ),
            };
        case ActionTypes.DELETE_NOTICE:
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload),
            };
        default:
            return state;
    }
};

export default noticeReducer;
