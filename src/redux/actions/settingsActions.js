import { ActionTypes } from "../constants/action-types";
import axios from "axios";
import {
    GET_SETTINGS_ENDPOINT,
    CREATE_SETTING_ENDPOINT,
    UPDATE_SETTING_ENDPOINT,
} from "../constants/endpoints";

export const fetchSettings = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(GET_SETTINGS_ENDPOINT);
            console.log('response', response);
            if (response.status === 200) {
                dispatch({
                    type: ActionTypes.FETCH_SETTINGS,
                    payload: response.data,
                });
            }
            else if (response.status === 404) {
                dispatch({
                    type: ActionTypes.FETCH_SETTINGS,
                    payload: [],
                });
            }
            return response.data;
        } catch (error) {
            console.error("Error fetching:", error);
            dispatch({
                type: ActionTypes.FETCH_SETTINGS,
                payload: [],
            });
            return { success: false, message: "Load failed. Please try again." };
        }
    };
};

// Create a new user
export const createSetting = (itemData) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(
                CREATE_SETTING_ENDPOINT,
                JSON.stringify(itemData),
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response.status === 200) {
                dispatch({
                    type: ActionTypes.CREATE_SETTING,
                    payload: response.data,
                });
            }
            return response.data;
        } catch (error) {
            console.error("Error creating:", error);
            return { success: false, message: "Failed. Please try again." };
        }
    };
};

export const updateSetting = (itemData) => {
    return async (dispatch) => {
        try {
            const response = await axios.put(
                UPDATE_SETTING_ENDPOINT,
                JSON.stringify(itemData),
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response.status === 200) {
                dispatch({
                    type: ActionTypes.UPDATE_SETTING,
                    payload: response.data,
                });
            }
            return response.data;
        } catch (error) {
            console.error("Error updating:", error);
            return { success: false, message: "Failed. Please try again." };
        }
    };
};
