import { ActionTypes } from "../constants/action-types";

const initialState = {
    items: [],
};

const mediaReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_MEDIAS:
            return { ...state, items: action.payload };

        case ActionTypes.CREATE_MEDIA:
            return {
                ...state,
                items: [...state.items, action.payload]
            };

        case ActionTypes.DELETE_MEDIA:
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload),
            };
        default:
            return state;
    }
};

export default mediaReducer;
