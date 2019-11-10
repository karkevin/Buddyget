import { GET_GROUP, ADD_GROUP, GROUP_LOADING } from "../actions/types";

const initialState = {
  group: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "GET_GROUP":
      return {
        ...state,
        group: action.payload,
        loading: false
      };
    case "ADD_GROUP":
    case "GROUP_LOADING":
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
