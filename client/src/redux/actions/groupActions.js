import axios from "axios";
import { getErrors } from "./errorActions";
import { tokenConfig } from "./authActions";
import { getGroupItems } from "./itemActions";

import {
  GET_GROUP,
  REGISTER_GROUP_FAIL,
  REGISTER_GROUP_SUCCESS,
  GROUP_LOADING,
  UPDATE_TRANSACTION
} from "./types";

export const setGroupLoading = () => {
  return {
    type: GROUP_LOADING
  };
};

/*
 * Registers a group.
 */
export const registerGroup = name => dispatch => {
  //headers
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  const body = JSON.stringify({ name });

  axios
    .post(`/api/groups`, body, config)
    .then(res => {
      dispatch({
        type: REGISTER_GROUP_SUCCESS,
        payload: res.data
      });
      dispatch(getGroupItems(res.data._id));
    })
    .catch(err => {
      // TODO change so you need permission to get Group.
      dispatch(getErrors(err.response.data, err.response.status));
      dispatch({
        type: REGISTER_GROUP_FAIL
      });
    });
};

export const getGroup = name => (dispatch, getState) => {
  dispatch(setGroupLoading());
  axios
    .get(`/api/groups/${name}`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_GROUP,
        payload: res.data
      });
      dispatch(getGroupItems(res.data._id));
    })
    .catch(err => dispatch(getErrors(err.response.data, err.response.status)));
};

// updates the group transactions.
export const updateTransaction = transaction => (dispatch, getState) => {
  dispatch(setGroupLoading());
  axios
    .put(`/api/transactions/`, transaction, tokenConfig(getState))
    .then(res => {
      dispatch({ type: UPDATE_TRANSACTION, payload: res.data });
    })
    .catch(err =>
      dispatch(
        getErrors(err.response.data, err.response.status, "TRANSACTION_FAIL")
      )
    );
};
