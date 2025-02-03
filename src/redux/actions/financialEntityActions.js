import { ActionTypes } from "../constants/action-types";
import axios from "axios";
import {
    GET_ALL_FINANCIAL_ENTITIES_ENDPOINT,
    GET_ALL_OPERATOR_ENDPOINT,
    GET_ALL_BANK_ENDPOINT,
    CREATE_FINANCIAL_ENTITY_ENDPOINT,
    UPDATE_FINANCIAL_ENTITY_ENDPOINT,
    DELETE_FINANCIAL_ENTITY_ENDPOINT
} from "../constants/endpoints";

const fetchFinancialEntitiesSuccess = (items) => ({
    type: ActionTypes.FETCH_FINANCIAL_ENTITIES,
    payload: items,
});

const fetchOperatorSuccess = (items) => ({
    type: ActionTypes.FETCH_FINANCIAL_ENTITIES,
    payload: items,
});

const fetchBankSuccess = (items) => ({
    type: ActionTypes.FETCH_FINANCIAL_ENTITIES,
    payload: items,
});

const createFinancialEntitySuccess = (item) => ({
    type: ActionTypes.CREATE_FINANCIAL_ENTITY,
    payload: item,
});

const updateFinancialEntitySuccess = (item) => ({
    type: ActionTypes.UPDATE_FINANCIAL_ENTITY,
    payload: item,
});

const deleteFinancialEntitySuccess = (id) => ({
    type: ActionTypes.DELETE_FINANCIAL_ENTITY,
    payload: id,
});

export const fetchFinancialEntities = () => {
    return async (dispatch, getState) => {
        const { accessToken } = getState().authStore;
        //console.log(accessToken, "accessToken");
        try {
            const response = await axios.get(GET_ALL_FINANCIAL_ENTITIES_ENDPOINT, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            dispatch(fetchFinancialEntitiesSuccess(response.data));
        } catch (error) {
            console.error("Error fetching financial entities:", error);
        }
    };
};

export const fetchOperatorEntities = () => {
    return async (dispatch, getState) => {
        const { accessToken } = getState().authStore;
        //console.log(accessToken, "accessToken");
        try {
            const response = await axios.get(GET_ALL_OPERATOR_ENDPOINT, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            dispatch(fetchOperatorSuccess(response.data));
        } catch (error) {
            console.error("Error fetching operator entities:", error);
        }
    };
};

export const fetchBankEntities = () => {
    return async (dispatch, getState) => {
        const { accessToken } = getState().authStore;
        //console.log(accessToken, "accessToken");
        try {
            const response = await axios.get(GET_ALL_BANK_ENDPOINT, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            dispatch(fetchBankSuccess(response.data));
        } catch (error) {
            console.error("Error fetching bank entities:", error);
        }
    };
};

export const createFinancialEntity = (formData) => {
    return async (dispatch, getState) => {
        const { accessToken } = getState().authStore;
        try {
            const response = await axios.post(CREATE_FINANCIAL_ENTITY_ENDPOINT, formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            });
            dispatch(createFinancialEntitySuccess(response.data));
        } catch (error) {
            console.error("Error creating financial entity:", error);
        }
    };
};

export const updateFinancialEntity = (id, formData) => {
    return async (dispatch, getState) => {
        const { accessToken } = getState().authStore;
        try {
            const response = await axios.put(UPDATE_FINANCIAL_ENTITY_ENDPOINT(id), formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            });
            dispatch(updateFinancialEntitySuccess(response.data));
            dispatch(fetchFinancialEntities());
        } catch (error) {
            console.error("Error updating financial entity:", error);
        }
    };
};

export const deleteFinancialEntity = (id) => {
    return async (dispatch, getState) => {
        const { accessToken } = getState().authStore;
        try {
            await axios.delete(DELETE_FINANCIAL_ENTITY_ENDPOINT(id), {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            dispatch(deleteFinancialEntitySuccess(id));
        } catch (error) {
            console.error("Error deleting financial entity:", error);
        }
    };
};
