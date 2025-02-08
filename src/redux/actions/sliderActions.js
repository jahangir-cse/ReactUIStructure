import { ActionTypes } from "../constants/action-types";
import axios from "axios";
import {
    GET_ALL_SLIDER_ENDPOINT,
    CREATE_SLIDER_ENDPOINT,
    UPDATE_SLIDER_ENDPOINT,
    DELETE_SLIDER_ENDPOINT,
} from "../constants/endpoints";

export const fetchSliders = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(GET_ALL_SLIDER_ENDPOINT);
            console.log('response', response);
            if (response.status === 200) {
                dispatch({
                    type: ActionTypes.FETCH_SLIDERS,
                    payload: response.data,
                });
            }
            else if (response.status === 404) {
                dispatch({
                    type: ActionTypes.FETCH_SLIDERS,
                    payload: [],
                });
            }
            return response.data;
        } catch (error) {
            console.error("Error fetching:", error);
            dispatch({
                type: ActionTypes.FETCH_SLIDERS,
                payload: [],
            });
            return { success: false, message: "Load failed. Please try again." };
        }
    };
};

// Create a new user
export const createSlider = (itemData) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(
                CREATE_SLIDER_ENDPOINT,
                JSON.stringify(itemData),
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response.status === 200) {
                dispatch({
                    type: ActionTypes.CREATE_SLIDER,
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

export const updateSlider = (itemData) => {
    return async (dispatch) => {
        try {
            const response = await axios.put(
                UPDATE_SLIDER_ENDPOINT,
                JSON.stringify(itemData),
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response.status === 200) {
                dispatch({
                    type: ActionTypes.UPDATE_SLIDER,
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

export const deleteSlider = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.delete(DELETE_SLIDER_ENDPOINT(id));
            if (response.status === 200) {
                dispatch({
                    type: ActionTypes.DELETE_SLIDER,
                    payload: response.data,
                });
            }
            return response.data;
        } catch (error) {
            console.error("Error deleting:", error);
            return { success: false, message: "Delete failed. Please try again." };
        }
    };
};

