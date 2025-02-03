import { ActionTypes } from "../constants/action-types";
import axios from "axios";
import {
    LOG_IN_ENDPOINT
} from "../constants/endpoints";

const loginSuccess = (items) => ({
    type: ActionTypes.LOGIN_USER,
    payload: items,
});


export const loginUser = () => {
    return async (dispatch) => {
        try {
            const response = await axios.post(LOG_IN_ENDPOINT);
            dispatch(loginSuccess(response.data));
            localStorage.setItem("accessToken", response.data.token);
        } catch (error) {
            console.error("Error fetching:", error);
        }
    };
};

