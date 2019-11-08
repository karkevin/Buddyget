import {
  GET_ITEMS,
  GET_USER_ITEMS,
  GET_ITEM_ID,
  ADD_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM,
  ITEMS_LOADING
} from "../actions/types";

const initialState = {
  items: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "GET_ITEMS":
    case "GET_USER_ITEMS":
    case "GET_ITEM_ID":
    case "ADD_ITEM":
    case "UPDATE_ITEM":
    case "DELETE_ITEM":
    case "ITEMS_LOADING":
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
