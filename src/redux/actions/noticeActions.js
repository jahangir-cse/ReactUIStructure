import { ActionTypes } from "../constants/action-types";
import axios from "axios";
import {
    GET_ALL_NOTICE_ENDPOINT,
    CREATE_NOTICE_ENDPOINT,
    UPDATE_NOTICE_ENDPOINT,
    DELETE_NOTICE_ENDPOINT
} from "../constants/endpoints";

const fetchNoticesSuccess = (items) => ({
    type: ActionTypes.FETCH_NOTICES,
    payload: items,
});

const createNoticeSuccess = (item) => ({
    type: ActionTypes.CREATE_NOTICE,
    payload: item,
});

const updateNoticeSuccess = (item) => ({
    type: ActionTypes.UPDATE_NOTICE,
    payload: item,
});

const deleteNoticeSuccess = (id) => ({
    type: ActionTypes.DELETE_NOTICE,
    payload: id,
});

export const fetchNotices = () => {
    return async (dispatch, getState) => {
        const { accessToken } = getState().authStore;
        try {
            const response = await axios.get(GET_ALL_NOTICE_ENDPOINT, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            dispatch(fetchNoticesSuccess(response.data));
        } catch (error) {
            console.error("Error fetching notices:", error);
        }
    };
};

export const createNotice = (formData) => {
    return async (dispatch, getState) => {
        const { accessToken } = getState().authStore;
        try {
            const response = await axios.post(CREATE_NOTICE_ENDPOINT, formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            });
            dispatch(createNoticeSuccess(response.data));
        } catch (error) {
            console.error("Error creating notice:", error);
        }
    };
};

export const updateNotice = (id, formData) => {
    return async (dispatch, getState) => {
        const { accessToken } = getState().authStore;
        try {
            const response = await axios.put(UPDATE_NOTICE_ENDPOINT(id), formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            });
            dispatch(updateNoticeSuccess(response.data));
            dispatch(fetchNotices());
        } catch (error) {
            console.error("Error updating notice:", error);
        }
    };
};

export const deleteNotice = (id) => {
    return async (dispatch, getState) => {
        const { accessToken } = getState().authStore;
        try {
            await axios.delete(DELETE_NOTICE_ENDPOINT(id), {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            dispatch(deleteNoticeSuccess(id));
        } catch (error) {
            console.error("Error deleting notice:", error);
        }
    };
};
