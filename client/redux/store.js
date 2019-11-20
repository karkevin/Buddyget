import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";

// NOTE to run with devtools, use the composeWithDevTools Option.
typeof window !== "undefined";

const initialState = {};

// an array of middlewares.
const middleware = [thunk];

const makeStore = (initialState = {}) =>
  createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  );

export default makeStore;
