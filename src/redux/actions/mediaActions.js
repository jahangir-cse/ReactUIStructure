import { ActionTypes } from "../constants/action-types";
import axios from "axios";
import {
    GET_ALL_MEDIA_ENDPOINT,
    CREATE_MEDIA_ENDPOINT,
    DELETE_MEDIA_ENDPOINT,
} from "../constants/endpoints";

export const fetchMedias = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(GET_ALL_MEDIA_ENDPOINT);
            console.log('response', response);
            if (response.status === 200) {
                dispatch({
                    type: ActionTypes.FETCH_MEDIAS,
                    payload: response.data,
                });
            }
            else if (response.status === 404) {
                dispatch({
                    type: ActionTypes.FETCH_MEDIAS,
                    payload: [],
                });
            }
            return response.data;
        } catch (error) {
            console.error("Error fetching:", error);
            dispatch({
                type: ActionTypes.FETCH_MEDIAS,
                payload: [],
            });
            return { success: false, message: "Load failed. Please try again." };
        }
    };
};

export const createMedia = (itemData) => {
    return async (dispatch) => {
        try {
            const formData = new FormData();
            formData.append("file", itemData.file); // Ensure correct key name
            formData.append("order", itemData.order);
            formData.append("createdBy", itemData.createdBy);

            const response = await axios.post(CREATE_MEDIA_ENDPOINT, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 200) {
                dispatch({
                    type: ActionTypes.CREATE_MEDIA,
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

export const deleteMedia = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.delete(DELETE_MEDIA_ENDPOINT(id));
            if (response.status === 200) {
                dispatch({
                    type: ActionTypes.DELETE_MEDIA,
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

