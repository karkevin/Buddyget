import { combineReducers } from "redux";
import itemReducer from "./itemReducer";
import groupReducer from "./groupReducer";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  item: itemReducer,
  group: groupReducer,
  auth: authReducer,
  error: errorReducer
});
