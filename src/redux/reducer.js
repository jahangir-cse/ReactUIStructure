import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import errorReducer from "./reducers/errorReducer";
import weatherReducer from "./reducers/weatherReducer";
import userReducer from "./reducers/userReducer";
const AuthPersistConfig = {
  key: 'Auth',
  storage: storage,
};

export const authPersistedStore = persistReducer(AuthPersistConfig, authReducer);

export const mainReducer = combineReducers({
  authStore: authPersistedStore,
  errorStore: errorReducer,
  weathers: weatherReducer,
  users: userReducer,
});
