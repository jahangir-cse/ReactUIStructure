import { ActionTypes } from "../constants/action-types";
import axios from "axios";
import {
    GET_ALL_BUNDLE_TYPE_ENDPOINT,
    CREATE_BUNDLE_TYPE_ENDPOINT,
    UPDATE_BUNDLE_TYPE_ENDPOINT,
    DELETE_BUNDLE_TYPE_ENDPOINT
} from "../constants/endpoints";

const fetchBundleTypesSuccess = (items) => ({
    type: ActionTypes.FETCH_BUNDLE_TYPES,
    payload: items,
});

const createBundleTypesSuccess = (item) => ({
    type: ActionTypes.CREATE_BUNDLE_TYPES,
    payload: item,
});

const updateBundleTypesSuccess = (item) => ({
    type: ActionTypes.UPDATE_BUNDLE_TYPES,
    payload: item,
});

const deleteBundleTypesSuccess = (id) => ({
    type: ActionTypes.DELETE_BUNDLE_TYPES,
    payload: id,
});

export const fetchBundleTypes = () => {
    return async (dispatch, getState) => {
        const { accessToken } = getState().authStore;
        //console.log(accessToken, "accessToken");
        try {
            const response = await axios.get(GET_ALL_BUNDLE_TYPE_ENDPOINT, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            dispatch(fetchBundleTypesSuccess(response.data));
        } catch (error) {
            console.error("Error fetching bundle:", error);
        }
    };
};

export const createBundleType = (formData) => {
    return async (dispatch, getState) => {
        const { accessToken } = getState().authStore;
        try {
            const response = await axios.post(CREATE_BUNDLE_TYPE_ENDPOINT, formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            });
            dispatch(createBundleTypesSuccess(response.data));
            dispatch(fetchBundleTypes());
        } catch (error) {
            console.error("Error creating bundle:", error);
        }
    };
};

export const updateBundleType = (id, formData) => {
    return async (dispatch, getState) => {
        const { accessToken } = getState().authStore;
        try {
            const response = await axios.put(UPDATE_BUNDLE_TYPE_ENDPOINT(id), formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            });
            dispatch(updateBundleTypesSuccess(response.data));
            dispatch(fetchBundleTypes());
        } catch (error) {
            console.error("Error updating bundle:", error);
        }
    };
};

export const deleteBundleType = (id) => {
    return async (dispatch, getState) => {
        const { accessToken } = getState().authStore;
        try {
            await axios.delete(DELETE_BUNDLE_TYPE_ENDPOINT(id), {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            dispatch(deleteBundleTypesSuccess(id));
            dispatch(fetchBundleTypes());
        } catch (error) {
            console.error("Error deleting bundle:", error);
        }
    };
};
