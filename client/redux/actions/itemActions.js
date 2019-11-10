import axios from "axios";
import { API_URL } from "../../config/keys";

import {
  GET_ITEMS,
  GET_USER_ITEMS,
  GET_ITEM_ID,
  ADD_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM,
  ITEMS_LOADING
} from "./types";

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  };
};

export const getItems = () => dispatch => {
  // able to call any actions
  dispatch(setItemsLoading());
  axios
    .get(`${API_URL}/api/items`)
    .then(res =>
      dispatch({
        type: GET_ITEMS,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};

export const addItem = item => (dispatch, getState) => {
  axios
    .post(`${API_URL}/api/items`, item)
    .then(res =>
      dispatch({
        type: ADD_ITEM,
        payload: res.data
      })
    )
    .catch(err => {
      console.log(err);
    });
};
