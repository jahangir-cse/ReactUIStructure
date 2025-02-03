import { combineReducers } from "@reduxjs/toolkit";
import errorReducer from "./reducers/errorReducer";
import weatherReducer from "./reducers/weatherReducer";
import userReducer from "./reducers/userReducer";


export const mainReducer = combineReducers({
  errorStore: errorReducer,
  weathers: weatherReducer,
  users: userReducer,
});
