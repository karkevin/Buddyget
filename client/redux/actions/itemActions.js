import axios from "axios";

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
  dispatch(setItemsLoading());
  axios
    .get("/api/items")
    .then(res => {
      dispatch({
        type: GET_ITEMS,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};
