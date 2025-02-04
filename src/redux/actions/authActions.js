import { ActionTypes } from '../constants/action-types';
import axios from 'axios';
import { SIGN_IN_ENDPOINT, REFRESH_TOKEN_ENDPOINT } from '../constants/endpoints';

const setData = (user) => {
    console.log("calling setUserSignInData from signIn Action");
    return {
        type: ActionTypes.SIGN_IN,
        payload: user,
    };
};

const setError = (error) => {
    return {
        type: ActionTypes.SIGN_IN_ERROR,
        payload: error,
    };
};

export const signInAction = (user) => {
    return async (dispatch) => {
        console.log("calling signInAction from signIn Action");
        console.log(SIGN_IN_ENDPOINT, "SIGN_IN_ENDPOINT");
        try {
            const response = await axios.post(SIGN_IN_ENDPOINT, {
                mobilePhone: user.mobilePhone,
                password: user.password,
            });

            console.log(response.data, "login response from signInAction");

            if (response.status === 200) {
                dispatch(setData(response.data));
                return response.data;
            }
        } catch (error) {
            if (error.response) {
                switch (error.response.status) {
                    case 401:
                        dispatch(setError("Wrong User Name or Password"));
                        break;
                    case 400:
                        const { title, detail } = error.response.data;
                        dispatch(setError(`${title}: ${detail}`));
                        break;
                    case 500:
                        dispatch(setError("Internal Server Error"));
                        break;
                    default:
                        dispatch(setError("Something went wrong"));
                        break;
                }
            } else {
                dispatch(setError("Network Error"));
            }
        }
    };
};

export const logoutAction = () => {
    return (dispatch) => {
        localStorage.removeItem('accessToken');
        dispatch({
            type: ActionTypes.SIGN_OUT,
        });
    };
};

let isRefreshing = false;
export const refreshToken = (refreshToken) => async (dispatch) => {
    if (isRefreshing) return;
    isRefreshing = true;

    try {
        if (!refreshToken) {
            throw new Error('Refresh token is required');
        }

        const response = await fetch(REFRESH_TOKEN_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: refreshToken }),  // Backend expects { token: refreshToken }
        });

        const data = await response.json();

        if (!response.ok || !data.flag) {
            throw new Error(data.message || 'Failed to refresh token');
        }

        // Dispatch new tokens to Redux store
        dispatch({
            type: ActionTypes.REFRESH_TOKEN,
            payload: {
                accessToken: data.token,
                refreshToken: data.refreshToken,
                expiresIn: data.expiresIn || 3600, // Default to 1 hour if not provided
            },
        });

        // Store new tokens in local storage
        localStorage.setItem("accessToken", data.token);
        localStorage.setItem("refreshToken", data.refreshToken);

        return data;
    } catch (error) {
        //console.log('Error refreshing token:', error);
        return null; // Returning null in case of failure
    }
    finally {
        isRefreshing = false;
    }
};

