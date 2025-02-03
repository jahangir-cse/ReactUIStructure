import { ActionTypes } from "../constants/action-types";
import axios from "axios";
import {
    GET_ALL_USER_ENDPOINT,
    CREATE_USER_ENDPOINT,
    UPDATE_USER_ENDPOINT,
    DELETE_USER_ENDPOINT,
    GET_BY_ID_USER_ENDPOINT,
    GET_USER_ENDPOINT
} from "../constants/endpoints";

const fetchUsersSuccess = (items) => ({
    type: ActionTypes.FETCH_USERS,
    payload: items,
});

const createUserSuccess = (item) => ({
    type: ActionTypes.CREATE_USER,
    payload: item,
});

const updateUserSuccess = (item) => ({
    type: ActionTypes.UPDATE_USER,
    payload: item,
});

const deleteUserSuccess = (id) => ({
    type: ActionTypes.DELETE_USER,
    payload: id,
});

const getByIdUserSuccess = (id) => ({
    type: ActionTypes.GET_BY_ID_USER,
    payload: id,
});

const getUserSuccess = (item) => ({
    type: ActionTypes.GET_USER,
    payload: item,
});

export const fetchUsers = () => {
    return async (dispatch, getState) => {
        const { accessToken } = getState().authStore;
        try {
            const response = await axios.get(GET_ALL_USER_ENDPOINT, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            const users = Array.isArray(response.data) ? response.data : response.data.users;
            dispatch(fetchUsersSuccess(users));
        } catch (error) {
            console.error("Error fetching Users:", error);
        }
    };
};

export const createUser = (formData) => {
    return async (dispatch, getState) => {
        const { accessToken } = getState().authStore;
        try {
            const response = await axios.post(CREATE_USER_ENDPOINT, formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            });
            dispatch(createUserSuccess(response.data));
        } catch (error) {
            console.error("Error creating User:", error);
        }
    };
};

export const updateUser = (id, formData) => {
    return async (dispatch, getState) => {
        const { accessToken } = getState().authStore;
        try {
            const response = await axios.put(UPDATE_USER_ENDPOINT(id), formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            });
            dispatch(updateUserSuccess(response.data));
            dispatch(fetchUsers());
        } catch (error) {
            console.error("Error updating User:", error);
        }
    };
};

export const deleteUser = (id) => {
    return async (dispatch, getState) => {
        const { accessToken } = getState().authStore;
        try {
            await axios.delete(DELETE_USER_ENDPOINT(id), {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            dispatch(deleteUserSuccess(id));
        } catch (error) {
            console.error("Error deleting User:", error);
        }
    };
};

export const getByIdUser = (id) => {
    return async (dispatch, getState) => {
        const { accessToken } = getState().authStore;
        try {
            await axios.delete(GET_BY_ID_USER_ENDPOINT(id), {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            dispatch(getByIdUserSuccess(id));
        } catch (error) {
            console.error("Error get User:", error);
        }
    };
};

export const getUser = () => {
    return async (dispatch, getState) => {
        const { accessToken } = getState().authStore;
        try {
            const response = await axios.get(GET_USER_ENDPOINT, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            dispatch(getUserSuccess(response.data));
        } catch (error) {
            console.error("Error get User:", error);
        }
    };
};

