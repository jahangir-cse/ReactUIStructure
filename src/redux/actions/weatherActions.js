import { ActionTypes } from "../constants/action-types";
import axios from "axios";
import {
    GET_ALL_WEATHER,
} from "../constants/endpoints";

const fetchWeatherSuccess = (items) => ({
    type: ActionTypes.FETCH_WEATHERS,
    payload: items,
});


export const fetchWeathers = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(GET_ALL_WEATHER);
            dispatch(fetchWeatherSuccess(response.data));
        } catch (error) {
            console.error("Error fetching:", error);
        }
    };
};
