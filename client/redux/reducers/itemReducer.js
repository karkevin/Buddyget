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

const sortedItems = (state, action) => {
  const ret = [...state.items];
  for (let i = 0; i < ret.length; i++) {
    if (ret[i].date <= action.payload.date) {
      ret.splice(i, 0, action.payload);
      return ret;
    }
  }
  ret.push(action.payload);
  console.log(ret);
  return ret;
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
        items: sortedItems(state, action)
      };
    case "UPDATE_ITEM":
    case "DELETE_ITEM":
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload)
      };
    case "ITEMS_LOADING":
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
