import { ActionTypes } from "../constants/action-types";

const initialState = {
    items: [],
    balance: null,
};

const transactionReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_BY_TRANSACTION_ID:
            return { ...state, items: Array.isArray(action.payload) ? action.payload : [] };
        case ActionTypes.CHECK_BALANCE:
            return { ...state, balance: action.payload };

        case ActionTypes.ADD_BALANCE:
            return {
                ...state,
                items: Array.isArray(state.items)
                    ? [...state.items, action.payload]
                    : [action.payload],
            };

        case ActionTypes.BUY_OFFERS:
            return {
                ...state,
                items: Array.isArray(state.items)
                    ? state.items.filter(item => item.id !== action.payload.id)
                    : [],
            };

        case ActionTypes.FETCH_TRANSACTIONS:
            return { ...state, items: action.payload };

        case ActionTypes.RECHARGE_TRANSACTIONS:
            return {
                ...state,
                items: Array.isArray(state.items)
                    ? state.items.filter(item => item.id !== action.payload.id)
                    : [],
            };

        default:
            return state;
    }
};

export default transactionReducer;
