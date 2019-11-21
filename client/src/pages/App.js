import React, { Component, Fragment } from "react";

// pages
import Home from "./Home";
import Login from "./Login";

// load user dispatch function
import { loadUser } from "../redux/actions/authActions";
import { connect } from "react-redux";

class App extends Component {
  componentDidMount() {
    console.log("hey");
    this.props.loadUser();
  }

  render() {
    return (
      <Fragment>{this.props.authenticated ? <Home /> : <Login />}</Fragment>
    );
  }
}

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated
});

export default connect(mapStateToProps, { loadUser })(App);
