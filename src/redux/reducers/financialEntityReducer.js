import { ActionTypes } from "../constants/action-types";

const initialState = {
    items: [],
};

const financialEntityReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_FINANCIAL_ENTITIES:
            return { ...state, items: action.payload };
        case ActionTypes.FETCH_OPERATOR:
            return { ...state, items: action.payload };
        case ActionTypes.FETCH_BANK:
            return { ...state, items: action.payload };
        case ActionTypes.CREATE_FINANCIAL_ENTITY:
            return { ...state, items: [...state.items, action.payload] };
        case ActionTypes.UPDATE_FINANCIAL_ENTITY:
            return {
                ...state,
                items: state.items.map(item =>
                    item.id === action.payload.id ? action.payload : item
                ),
            };
        case ActionTypes.DELETE_FINANCIAL_ENTITY:
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload),
            };
        default:
            return state;
    }
};

export default financialEntityReducer;
