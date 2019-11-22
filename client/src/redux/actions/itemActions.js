import axios from "axios";
import { tokenConfig } from "./authActions";
import { getErrors } from "./errorActions";
import { getGroup } from "./groupActions";

import {
  GET_ITEMS,
  GET_GROUP_ITEMS,
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

export const getGroupItems = groupId => (dispatch, getState) => {
  // able to call any actions
  dispatch(setItemsLoading());
  axios
    .get(`/api/items/group/${groupId}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: GET_GROUP_ITEMS,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};

export const addItem = item => (dispatch, getState) => {
  axios
    .post(`/api/items`, item, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: ADD_ITEM,
        payload: res.data
      });
      dispatch(getGroup(res.data.buyer.group));
    })
    .catch(err => {
      dispatch(getErrors(err.response.data, err.response.status, "ITEM_FAIL"));
      // dispatch(getErrors(err.response.data, err.response.status, "ITEM_FAIL"));
      console.log(err);
    });
};

export const deleteItem = id => (dispatch, getState) => {
  axios
    .delete(`/api/items/${id}`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: DELETE_ITEM, payload: id });
      dispatch(getGroup(res.data.buyer.group));
    })
    .catch(err =>
      dispatch(getErrors(err.response.data, err.response.status, "ITEM_FAIL"))
    );
};

export const updateItem = update => (dispatch, getState) => {
  axios
    .put(`/api/items/${update._id}`, update, tokenConfig(getState))
    .then(res => {
      dispatch({ type: UPDATE_ITEM, payload: res.data });
      dispatch(getGroup(res.data.buyer.group));
    })
    .catch(err => {
      console.log(err);
      dispatch(getErrors(err.response.data, err.response.status, "ITEM_FAIL"));
    });
};
