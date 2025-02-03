import { combineReducers } from "@reduxjs/toolkit";
import errorReducer from "./reducers/errorReducer";
import weatherReducer from "./reducers/weatherReducer";


export const mainReducer = combineReducers({
  errorStore: errorReducer,
  weathers: weatherReducer,
});
