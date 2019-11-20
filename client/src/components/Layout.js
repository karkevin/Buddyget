// include metadata in all pages of the site.
import Nav from "./Nav";
import React, { Component, Fragment } from "react";

export default class Layout extends Component {
  render() {
    return (
      <Fragment>
        <Nav />
        <Fragment>{this.props.children}</Fragment>
      </Fragment>
    );
  }
}
