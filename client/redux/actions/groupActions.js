import axios from "axios";
import { API_URL } from "../../config/keys";

import { GET_GROUP, ADD_GROUP, GROUP_LOADING } from "./types";

export const setGroupLoading = () => {
  return {
    type: GROUP_LOADING
  };
};

export const getGroup = id => dispatch => {
  dispatch(setGroupLoading());
  axios
    .get(`${API_URL}/api/groups/${id}`) // add proxy in the package.json to do set prefix as localhost.
    .then(res => {
      dispatch({
        type: GET_GROUP,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};
