import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import errorReducer from "./reducers/errorReducer";
import userReducer from "./reducers/userReducer";
import sliderReducer from "./reducers/sliderReducer";
import mediaReducer from "./reducers/mediaReducer";
import settingsReducer from "./reducers/settingsReducer";
const AuthPersistConfig = {
  key: 'Auth',
  storage: storage,
};

export const authPersistedStore = persistReducer(AuthPersistConfig, authReducer);

export const mainReducer = combineReducers({
  authStore: authPersistedStore,
  errorStore: errorReducer,
  sliders: sliderReducer,
  users: userReducer,
  medias: mediaReducer,
  settings: settingsReducer
});
