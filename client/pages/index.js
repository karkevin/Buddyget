import "../assets/style.css";
import React, { Component } from "react";

// pages
import Home from "./home";
import Register from "./register";

// load user dispatch function
import { loadUser } from "../redux/actions/authActions";
import { connect } from "react-redux";

class Index extends Component {
  componentDidMount() {
    loadUser();
  }

  render() {
    return <div>{this.props.authenticated ? <Home /> : <Register />}</div>;
  }
}

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated
});

export default connect(mapStateToProps, { loadUser })(Index);
