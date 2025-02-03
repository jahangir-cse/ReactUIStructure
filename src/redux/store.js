import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import {thunk} from "redux-thunk"; // Correct import
import { mainReducer } from "./reducer";
import authMiddleware from "./middleware/authMiddleware";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, mainReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk).concat(authMiddleware),
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);