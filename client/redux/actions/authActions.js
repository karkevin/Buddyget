import axios from "axios";
import { API_URL } from "../../config/keys";

import { getErrors } from "./errorActions";
import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS
} from "./types";

/* check token and load user.
 * Must get token from localStorage
 */
export const loadUser = () => (dispatch, getState) => {
  // set user loading
  dispatch({ type: USER_LOADING });

  axios
    .get(`${API_URL}/api/auth/user`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(getErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};

// initializes the axios request header to send along a token to the database.
export const tokenConfig = getState => {
  // get token from localstorage
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  // if token exists, add it to the axios request header
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return config;
};
