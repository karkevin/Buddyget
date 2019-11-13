import "../assets/style.css";
import React, { Component, Fragment } from "react";

// pages
import Home from "./home";
import Register from "./register";

// required to allow components to access the state.
import { Provider } from "react-redux";
import store from "../redux/store";

// load user dispatch function
import { loadUser } from "../redux/actions/authActions";

class Index extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        {store.getState().auth.isAuthenticated ? <Home /> : <Register />}
      </Provider>
    );
  }
}

export default Index;
