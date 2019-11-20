// import { GET_GROUP, ADD_GROUP, GROUP_LOADING } from "../actions/types";

const initialState = {
  group: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "GET_GROUP":
    case "REGISTER_GROUP_SUCCESS":
      return {
        ...state,
        group: action.payload,
        loading: false
      };
    case "REGISTER_GROUP_FAIL":
      return {
        ...state,
        group: {},
        loading: false
      };
    case "GROUP_LOADING":
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
