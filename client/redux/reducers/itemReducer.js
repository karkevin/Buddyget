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

/*
 * Sorts state.items based on the date.
 */
const sortedItems = (state, newItem) => {
  const ret = state.items;
  for (let i = 0; i < ret.length; i++) {
    if (ret[i].date <= newItem.date) {
      ret.splice(i, 0, newItem);
      return ret;
    }
  }
  ret.push(newItem);
  return ret;
};

// Updates state.items after PUT request. Assume that the item to update already exists in the state.
const updatedItems = (state, update) => {
  const ret = state.items;
  for (let i = 0; i < ret.length; i++) {
    if (ret[i]._id === update._id) {
      if (ret[i].date === update.date) {
        ret.splice(i, 1, update);
        return ret;
      } else {
        ret.splice(i, 1);
        return sortedItems(state, update);
      }
    }
  }
  console.log("Error: item not in state.");
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
        items: sortedItems(state, action.payload)
      };
    case "UPDATE_ITEM":
      return {
        ...state,
        items: updatedItems(state, action.payload)
      };
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
