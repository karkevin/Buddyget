import { combineReducers } from "redux";
import itemReducer from "./itemReducer";
import groupReducer from "./groupReducer";

export default combineReducers({
  item: itemReducer,
  group: groupReducer
});
