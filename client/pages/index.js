import "../assets/style.css";
import React, { Component, Fragment } from "react";

// pages
import Home from "./home";
import Register from "./register";

// required to allow components to access the state.
// import { Provider } from "react-redux";
// import store from "../redux/store";

class Index extends Component {
  state = {
    isAuthenticated: true
  };

  render() {
    return <>{this.state.isAuthenticated ? <Home /> : <Register />}</>;
  }
}

export default Index;
