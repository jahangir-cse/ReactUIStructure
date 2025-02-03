import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import errorReducer from "./reducers/errorReducer";
import financialEntityReducer from "./reducers/financialEntityReducer";
import offerReducer from "./reducers/offerReducer";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import bundleTypeReducer from "./reducers/bundleTypeReducer";
import transactionReducer from "./reducers/transactionReducer";
import noticeReducer from "./reducers/noticeReducer";
import accountReducer from "./reducers/accountReducer";
const AuthPersistConfig = {
  key: 'Auth',
  storage: storage,
};

export const authPersistedStore = persistReducer(AuthPersistConfig, authReducer);

export const mainReducer = combineReducers({
  authStore: authPersistedStore,
  errorStore: errorReducer,
  financialEntities: financialEntityReducer,
  offers: offerReducer,
  bundleTypes: bundleTypeReducer,
  transaction: transactionReducer,
  notices: noticeReducer,
  accounts: accountReducer,
});
