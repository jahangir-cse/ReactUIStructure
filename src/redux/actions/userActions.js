import { ActionTypes } from "../constants/action-types";
import axios from "axios";
import {
    GET_ALL_USER_ENDPOINT,
    CREATE_USER_ENDPOINT,
    UPDATE_USER_ENDPOINT,
    UPDATE_PROFILE_USER_ENDPOINT,
    DELETE_USER_ENDPOINT,
    GET_BY_NUMBER_USER_ENDPOINT
} from "../constants/endpoints";

// Fetch all users
export const fetchUsers = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(GET_ALL_USER_ENDPOINT);
            if (response.data.flag) {
                dispatch({
                    type: ActionTypes.FETCH_USERS,
                    payload: response.data.users,
                });
            }
            console.log('response data', response.data);
            return response.data;
        } catch (error) {
            console.error("Error fetching users:", error);
            return { success: false, message: "Load user failed. Please try again." };
        }
    };
};

// Create a new user
export const createUser = (userData) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(
                CREATE_USER_ENDPOINT,
                JSON.stringify(userData),
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response.data.flag) {
                dispatch({
                    type: ActionTypes.CREATE_USER,
                    payload: response.data.user,
                });
            }
            return response.data;
        } catch (error) {
            console.error("Error creating user:", error);
            return { success: false, message: "Register failed. Please try again." };
        }
    };
};

// Update user details
export const updateUser = (userData) => {
    return async (dispatch) => {
        try {
            const response = await axios.put(
                UPDATE_USER_ENDPOINT,
                JSON.stringify(userData),
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response.data.flag) {
                dispatch({
                    type: ActionTypes.UPDATE_USER,
                    payload: response.data.user,
                });
            }
            return response.data;
        } catch (error) {
            console.error("Error updating user:", error);
            return { success: false, message: "Update failed. Please try again." };
        }
    };
};

// Update user profile
export const updateUserProfile = (userProfileData) => {
    return async (dispatch) => {
        try {
            const response = await axios.put(
                UPDATE_PROFILE_USER_ENDPOINT,
                JSON.stringify(userProfileData),
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response.data.flag) {
                dispatch({
                    type: ActionTypes.UPDATE_USER_PROFILE,
                    payload: response.data.user,
                });
            }
            return response.data;
        } catch (error) {
            console.error("Error updating user profile:", error);
            return { success: false, message: "Profile update failed. Please try again." };
        }
    };
};

// Delete a user
export const deleteUser = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.delete(DELETE_USER_ENDPOINT(id));
            if (response.data.flag) {
                dispatch({
                    type: ActionTypes.DELETE_USER,
                    payload: id,
                });
            }
            return response.data;
        } catch (error) {
            console.error("Error deleting user:", error);
            return { success: false, message: "Delete failed. Please try again." };
        }
    };
};

// Get user by number
export const getUserByNumber = (number) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(GET_BY_NUMBER_USER_ENDPOINT(number));
            if (response.data.flag) {
                dispatch({
                    type: ActionTypes.GET_BY_NUMBER_USER,
                    payload: response.data.user,
                });
            }
            return response.data;
        } catch (error) {
            console.error("Error fetching user by number:", error);
            return { success: false, message: "User not found. Please try again." };
        }
    };
};
