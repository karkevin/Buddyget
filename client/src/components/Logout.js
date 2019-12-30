import React, { Component, Fragment } from "react";
import { logoutUser } from "../redux/actions/authActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class Logout extends Component {
  static propTypes = {
    logoutUser: PropTypes.func.isRequired,
    authenticated: PropTypes.bool
  };

  render() {
    return (
      <Fragment>
        {this.props.authenticated ? (
          <Link to="/">
            <a
              href=""
              onClick={this.props.logoutUser}
              className="block mt-4 sm:inline-block sm:mt-0 text-blue-200 text-xl font-medium hover:text-white transition-all"
            >
              Logout
            </a>
          </Link>
        ) : null}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated
});

export default connect(mapStateToProps, { logoutUser })(Logout);
