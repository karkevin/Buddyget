import axios from "axios";
import { API_URL } from "../../config/keys";
import { getErrors } from "./errorActions";

import {
  GET_GROUP,
  REGISTER_GROUP_FAIL,
  REGISTER_GROUP_SUCCESS,
  GROUP_LOADING
} from "./types";

export const setGroupLoading = () => {
  return {
    type: GROUP_LOADING
  };
};

/*
 * Registers a group.
 */
export const registerGroup = name => {
  //headers
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  const body = JSON.stringify({ name });

  axios
    .post(`${API_URL}/api/groups`, body, config)
    .then(res => {
      dispatch({
        type: REGISTER_GROUP_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(getErrors(err.response.data, err.response.status));
      dispatch({
        type: REGISTER_GROUP_FAIL
      });
    });
};

export const getGroup = id => dispatch => {
  dispatch(setGroupLoading());
  axios
    .get(`${API_URL}/api/groups/${id}`)
    .then(res => {
      dispatch({
        type: GET_GROUP,
        payload: res.data
      });
    })
    .catch(err => dispatch(getErrors(err.response.data, err.response.status)));
};
