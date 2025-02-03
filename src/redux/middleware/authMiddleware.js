import { ActionTypes } from '../constants/action-types';
// import { refreshToken as refreshAuthToken } from '../actions/authActions';

const authMiddleware = ({ dispatch, getState }) => next => async action => {
    if (typeof action === 'function') {
        return next(action);
    }

    // const state = getState();
    // const { accessToken, refreshToken, expiredAt } = state.authStore;

    // if (refreshToken && Date.now() >= expiredAt) {
    //     console.log("Refreshing token");
    //     const newTokens = await dispatch(refreshAuthToken(refreshToken));
    //     if (newTokens) {
    //         // Store new tokens in the state
    //         dispatch({
    //             type: ActionTypes.REFRESH_TOKEN,
    //             payload: {
    //                 accessToken: newTokens.accessToken,
    //                 refreshToken: newTokens.refreshToken,
    //                 expiresIn: newTokens.expiresIn,
    //             },
    //         });
    //         action.payload = action.payload || {};
    //         action.payload.accessToken = newTokens.accessToken;
    //     }
    // }

    return next(action);
};

export default authMiddleware;
