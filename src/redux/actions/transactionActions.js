import { ActionTypes } from "../constants/action-types";
import axios from "axios";
import {
    GET_ALL_TRANSACTION_ENDPOINT,
    FETCH_BY_TRANSACTION_ID_ENDPOINT,
    CHECK_BALANCE_TRANSACTION_ENDPOINT,
    CREATE_BALANCE_TRANSACTION_ENDPOINT,
    SELL_OFFER_TRANSACTION_ENDPOINT,
    RECHARGE_TRANSACTION_ENDPOINT
} from "../constants/endpoints";

const fetchByTransactionIdSuccess = (items) => ({
    type: ActionTypes.FETCH_BY_TRANSACTION_ID,
    payload: items,
});

const checkBalanceSuccess = (balance) => ({
    type: ActionTypes.CHECK_BALANCE,
    payload: balance,
});

const addBalanceSuccess = (item) => ({
    type: ActionTypes.ADD_BALANCE,
    payload: item,
});

const buyOffersSuccess = (item) => ({
    type: ActionTypes.BUY_OFFERS,
    payload: item,
});

const fetchTransactionsSuccess = (items) => ({
    type: ActionTypes.FETCH_TRANSACTIONS,
    payload: items,
});

const rechargeSuccess = (item) => ({
    type: ActionTypes.RECHARGE_TRANSACTIONS,
    payload: item,
});

export const fetchByTransactionId = (id) => {
    return async (dispatch, getState) => {
        const { accessToken } = getState().authStore;
        try {
            const response = await axios.get(FETCH_BY_TRANSACTION_ID_ENDPOINT(id), {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            dispatch(fetchByTransactionIdSuccess(response.data));
        } catch (error) {
            console.error("Error fetching by transaction id:", error);
        }
    };
};

export const checkBalance = () => {
    return async (dispatch, getState) => {
        const { accessToken } = getState().authStore;
        try {
            const response = await axios.get(CHECK_BALANCE_TRANSACTION_ENDPOINT, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            dispatch(checkBalanceSuccess(response.data.balance));
        } catch (error) {
            console.error("Error checking balance:", error);
        }
    };
};

export const addBalance = (formData) => {
    return async (dispatch, getState) => {
        const { accessToken } = getState().authStore;
        try {
            const response = await axios.post(CREATE_BALANCE_TRANSACTION_ENDPOINT, formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            });
            dispatch(addBalanceSuccess(response.data));
        } catch (error) {
            console.error("Error adding balance:", error);
        }
    };
};


export const buyOffers = (formData) => {
    return async (dispatch, getState) => {
        const { accessToken } = getState().authStore;
        try {
            const response = await axios.post(SELL_OFFER_TRANSACTION_ENDPOINT, formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            });
            dispatch(buyOffersSuccess(response.data));
            dispatch(fetchTransactions());
        } catch (error) {
            console.error("Error updating offer:", error);
        }
    };
};

export const fetchTransactions = () => {
    return async (dispatch, getState) => {
        const { accessToken } = getState().authStore;
        try {
            const response = await axios.get(GET_ALL_TRANSACTION_ENDPOINT, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            //console.log('Fetch Transaction', response.data);
            dispatch(fetchTransactionsSuccess(response.data));
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    };
};

export const rechargeTransaction = (formData) => {
    return async (dispatch, getState) => {
        const { accessToken } = getState().authStore;
        try {
            const response = await axios.post(RECHARGE_TRANSACTION_ENDPOINT, formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            });
            dispatch(rechargeSuccess(response.data));
            dispatch(fetchTransactions());
        } catch (error) {
            console.error("Error recharging:", error);
        }
    };
};