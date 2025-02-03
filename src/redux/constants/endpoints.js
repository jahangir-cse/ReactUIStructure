import config from "../../config";

const apiHost = config.host;

export const SIGN_IN_ENDPOINT = `${apiHost}/login`;
export const REFRESH_TOKEN_ENDPOINT = `${apiHost}/refresh`; 

export const GET_ALL_FINANCIAL_ENTITIES_ENDPOINT = `${apiHost}/financialentity/getall`;
export const GET_ALL_OPERATOR_ENDPOINT = `${apiHost}/financialentity/getoperators`;
export const GET_ALL_BANK_ENDPOINT = `${apiHost}/financialentity/getbanks`;
export const CREATE_FINANCIAL_ENTITY_ENDPOINT = `${apiHost}/financialentity`;
export const UPDATE_FINANCIAL_ENTITY_ENDPOINT = (id) => `${apiHost}/financialentity/${id}`;
export const DELETE_FINANCIAL_ENTITY_ENDPOINT = (id) => `${apiHost}/financialentity/${id}`;

export const GET_ALL_BUNDLE_TYPE_ENDPOINT = `${apiHost}/bundletype/getall`;
export const CREATE_BUNDLE_TYPE_ENDPOINT = `${apiHost}/bundletype`;
export const UPDATE_BUNDLE_TYPE_ENDPOINT = (id) => `${apiHost}/bundletype/${id}`;
export const DELETE_BUNDLE_TYPE_ENDPOINT = (id) => `${apiHost}/bundletype/${id}`;

export const FETCH_BY_TRANSACTION_ID_ENDPOINT = (id) => `${apiHost}/transaction/GetByTransactionId/${id}`;
export const CHECK_BALANCE_TRANSACTION_ENDPOINT = `${apiHost}/transaction/checkbalance`;
export const CREATE_BALANCE_TRANSACTION_ENDPOINT = `${apiHost}/transaction/addbalance`;
export const SELL_OFFER_TRANSACTION_ENDPOINT = `${apiHost}/transaction/selloffer`;
export const GET_ALL_TRANSACTION_ENDPOINT = `${apiHost}/transaction/getall?page=1&pageSize=10`;
export const RECHARGE_TRANSACTION_ENDPOINT = `${apiHost}/transaction/recharge`;

export const GET_ALL_OFFER_ENDPOINT = `${apiHost}/offer/getall`;
export const CREATE_OFFER_ENDPOINT = `${apiHost}/offer`;
export const UPDATE_OFFER_ENDPOINT = (id) => `${apiHost}/offer/${id}`;
export const DELETE_OFFER_ENDPOINT = (id) => `${apiHost}/offer/${id}`;

export const GET_ALL_NOTICE_ENDPOINT = `${apiHost}/notice/getall`;
export const CREATE_NOTICE_ENDPOINT = `${apiHost}/notice`;
export const UPDATE_NOTICE_ENDPOINT = (id) => `${apiHost}/notice/${id}`;
export const DELETE_NOTICE_ENDPOINT = (id) => `${apiHost}/notice/${id}`;

export const GET_ALL_USER_ENDPOINT = `${apiHost}/account/getAll`;
export const CREATE_USER_ENDPOINT = `${apiHost}/account`;
export const UPDATE_USER_ENDPOINT = (id) => `${apiHost}/account/${id}`;
export const DELETE_USER_ENDPOINT = (id) => `${apiHost}/account/${id}`;
export const GET_USER_ENDPOINT = `${apiHost}/account`;
export const GET_BY_ID_USER_ENDPOINT = (id) => `${apiHost}/account/${id}`;