import React, { Component } from "react";
import { connect } from "react-redux";

// Pages
import Home from "../pages/home";
import Register from "../pages/register";

/**
 * This class is primarily used as the switch between login screen and home screen.
 */
class Switch extends Component {
  render() {
    return <div>{this.props.authenticated ? <Home /> : <Register />}</div>;
  }
}

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated
});

export default connect(mapStateToProps)(Switch);
