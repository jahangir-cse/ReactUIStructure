import { ActionTypes } from '../constants/action-types';
import { refreshToken as refreshAuthToken } from '../actions/authActions';

const authMiddleware = ({ dispatch, getState }) => next => async action => {
    if (typeof action === 'function') {
        return next(action);
    }

    const state = getState();
    const { accessToken, refreshToken, expiredAt } = state.authStore;
    if (refreshToken && Date.now() >= expiredAt) {
        //console.log("Refreshing token");
        const newTokens = await dispatch(refreshAuthToken(refreshToken));
        if (newTokens) {
            dispatch({
                type: ActionTypes.REFRESH_TOKEN,
                payload: {
                    accessToken: newTokens.token,
                    refreshToken: newTokens.refreshToken,
                    expiresIn: newTokens.expiresIn || 3600,
                },
            });
            action.payload = action.payload || {};
            action.payload.accessToken = newTokens.token;
        }
    }

    return next(action);
};

export default authMiddleware;