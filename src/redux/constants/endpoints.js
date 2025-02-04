import config from "../../config";

const apiHost = config.host;

export const SIGN_IN_ENDPOINT = `${apiHost}/api/Authentication/Login`;
export const REFRESH_TOKEN_ENDPOINT = `${apiHost}/api/Authentication/refresh-token`; 

export const GET_ALL_WEATHER = `${apiHost}/WeatherForecast`;