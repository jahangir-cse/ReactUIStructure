import config from "../../config";

const apiHost = config.host;

export const SIGN_IN_ENDPOINT = `${apiHost}/login`;
export const REFRESH_TOKEN_ENDPOINT = `${apiHost}/refresh`; 

export const GET_ALL_WEATHER = `${apiHost}/WeatherForecast`;