import { ActionTypes } from "../constants/action-types";
import axios from "axios";
import {
    GET_ALL_OFFER_ENDPOINT,
    CREATE_OFFER_ENDPOINT,
    UPDATE_OFFER_ENDPOINT,
    DELETE_OFFER_ENDPOINT
} from "../constants/endpoints";

const fetchOffersSuccess = (items) => ({
    type: ActionTypes.FETCH_OFFERS,
    payload: items,
});

const createOffersSuccess = (item) => ({
    type: ActionTypes.CREATE_OFFERS,
    payload: item,
});

const updateOffersSuccess = (item) => ({
    type: ActionTypes.UPDATE_OFFERS,
    payload: item,
});

const deleteOffersSuccess = (id) => ({
    type: ActionTypes.DELETE_OFFERS,
    payload: id,
});

export const fetchOffers = () => {
    return async (dispatch, getState) => {
        const { accessToken } = getState().authStore;
        //console.log(accessToken, "accessToken");
        try {
            const response = await axios.get(GET_ALL_OFFER_ENDPOINT, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            dispatch(fetchOffersSuccess(response.data));
        } catch (error) {
            console.error("Error fetching offer:", error);
        }
    };
};

export const createOffers = (formData) => {
    return async (dispatch, getState) => {
        const { accessToken } = getState().authStore;
        try {
            const response = await axios.post(CREATE_OFFER_ENDPOINT, formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            });
            dispatch(createOffersSuccess(response.data));
        } catch (error) {
            console.error("Error creating offer:", error);
        }
    };
};

export const updateOffers = (id, formData) => {
    return async (dispatch, getState) => {
        const { accessToken } = getState().authStore;
        try {
            const response = await axios.put(UPDATE_OFFER_ENDPOINT(id), formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            });
            dispatch(updateOffersSuccess(response.data));
            dispatch(fetchOffers());
        } catch (error) {
            console.error("Error updating offer:", error);
        }
    };
};

export const deleteOffers = (id) => {
    return async (dispatch, getState) => {
        const { accessToken } = getState().authStore;
        try {
            await axios.delete(DELETE_OFFER_ENDPOINT(id), {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            dispatch(deleteOffersSuccess(id));
        } catch (error) {
            console.error("Error deleting offer:", error);
        }
    };
};
