import config from "../../config";

const apiHost = config.host;

export const SIGN_IN_ENDPOINT = `${apiHost}/api/Authentication/Login`;
export const REFRESH_TOKEN_ENDPOINT = `${apiHost}/api/Authentication/refresh-token`; 

export const GET_ALL_USER_ENDPOINT = `${apiHost}/api/Authentication/users`;
export const GET_ALL_ROLE_ENDPOINT = `${apiHost}/api/Authentication/roles`;
export const CREATE_USER_ENDPOINT = `${apiHost}/api/Authentication/Register`;
export const UPDATE_USER_ENDPOINT = `${apiHost}/api/Authentication/update-user`;
export const UPDATE_PROFILE_USER_ENDPOINT = `${apiHost}/api/Authentication/update-profile`;
export const DELETE_USER_ENDPOINT = (id) => `${apiHost}/api/Authentication/delete-user/${id}`;
export const GET_BY_NUMBER_USER_ENDPOINT = (number) => `${apiHost}/api/Authentication/user/${number}`;
export const GET_USER_ENDPOINT = (token) => `${apiHost}/api/Authentication/get-user/${token}`;

export const GET_ALL_SLIDER_ENDPOINT = `${apiHost}/api/Slide/all`;
export const CREATE_SLIDER_ENDPOINT = `${apiHost}/api/Slide/add`;
export const UPDATE_SLIDER_ENDPOINT = `${apiHost}/api/Slide/update`;
export const DELETE_SLIDER_ENDPOINT = (id) => `${apiHost}/api/Slide/delete/${id}`;

export const GET_ALL_MEDIA_ENDPOINT = `${apiHost}/api/Media/all`;
export const CREATE_MEDIA_ENDPOINT = `${apiHost}/api/Media/add`;
export const DELETE_MEDIA_ENDPOINT = (id) => `${apiHost}/api/Media/delete/${id}`;

export const GET_SETTINGS_ENDPOINT = `${apiHost}/api/Settings/all`;
export const CREATE_SETTING_ENDPOINT = `${apiHost}/api/Settings/add`;
export const UPDATE_SETTING_ENDPOINT = `${apiHost}/api/Settings/update`;