import { ActionTypes } from "../constants/action-types";
import axios from "axios";
import { SIGN_IN_ENDPOINT, REFRESH_TOKEN_ENDPOINT } from "../constants/endpoints";

// export const loginUser = (userData) => {
//     return async (dispatch) => {
//         try {
//             const response = await axios.post(
//                 LOG_IN_ENDPOINT,
//                 JSON.stringify(userData),
//                 {
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                 }
//             );
//             if (response.data.flag) {
//                 dispatch({
//                     type: ActionTypes.LOGIN_USER,
//                     payload: response.data,
//                 });
//                 localStorage.setItem("accessToken", response.data.token);
//             }
//             return response.data;
//         } catch (error) {
//             console.error("Error fetching:", error);
//             return { success: false, message: "Login failed. Please try again." };
//         }
//     };
// };

