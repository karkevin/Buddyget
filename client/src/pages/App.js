import React, { Component } from "react";

// pages
import Home from "./home";
import Register from "./register";

// load user dispatch function
import { loadUser } from "../redux/actions/authActions";
import { connect } from "react-redux";

class App extends Component {
  componentDidMount() {
    console.log("hey");
    this.props.loadUser();
  }

  render() {
    return <div>{this.props.authenticated ? <Home /> : <Register />}</div>;
  }
}

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated
});

export default connect(mapStateToProps, { loadUser })(App);
