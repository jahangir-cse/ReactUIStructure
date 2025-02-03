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
                email: user.email,
                password: user.password,
            });

            console.log(response.data, "login response from signInAction");

            if (response.status === 200) {
                // redirect to home page
                window.location.href = "/";
                dispatch(setData(response.data));
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


export const refreshToken = (refreshToken) => async (dispatch) => {
    console.log(REFRESH_TOKEN_ENDPOINT, "REFRESH_TOKEN_ENDPOINT");
    try {
        if (!refreshToken) {
            throw new Error('Refresh token is required');
        }

        const response = await fetch(REFRESH_TOKEN_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refreshToken }),
        });

        if (!response.ok) {
            throw new Error('Failed to refresh token');
        }

        const data = await response.json();
        dispatch({
            type: ActionTypes.REFRESH_TOKEN,
            payload: {
                accessToken: data.accessToken,
                refreshToken: data.refreshToken,
                expiresIn: data.expiresIn,
            },
        });

        return data;
    } catch (error) {
        console.error('Error refreshing token:', error);
    }
};
