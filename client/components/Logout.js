import React, { Component, Fragment } from "react";
import { logoutUser } from "../redux/actions/authActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Logout extends Component {
  static propTypes = {
    logoutUser: PropTypes.func.isRequired,
    authenticated: PropTypes.bool
  };

  render() {
    return (
      <Fragment>
        {this.props.authenticated ? (
          <a
            href=""
            onClick={this.props.logoutUser}
            className="block mt-4 sm:inline-block sm:mt-0 text-blue-200 hover:text-white"
          >
            Logout
          </a>
        ) : null}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated
});

export default connect(mapStateToProps, { logoutUser })(Logout);
