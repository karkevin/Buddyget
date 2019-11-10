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
      return {
        ...state,
        items: action.payload,
        loading: false
      };
    case "GET_USER_ITEMS":
    case "GET_ITEM_ID":
    case "ADD_ITEM":
      return {
        ...state,
        items: [action.payload, ...state.items]
      };
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
