import React, { Component, Fragment } from "react";
import { Redirect, Link } from "react-router-dom";

// Redux imports
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/authActions";
import { registerUser } from "../redux/actions/authActions";
import { clearErrors } from "../redux/actions/errorActions";
import PropTypes from "prop-types";

// assets
import left from "../../public/left.png";
import right from "../../public/right.png";

// components
import Title from "../components/landing/Title";
import FormInput from "../components/FormInput";

// Converts a JS array to object for the state.
const arrayToObject = array => {
  return array.reduce(
    (obj, item) => {
      return {
        ...obj,
        [item.toLowerCase()]: ""
      };
    },
    { msg: null }
  );
};

class Form extends Component {
  state = arrayToObject(this.props.items);

  static propTypes = {
    loginUser: PropTypes.func.isRequired,
    registerUser: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    error: PropTypes.object.isRequired,
    authenticated: PropTypes.bool
  };

  componentDidUpdate(prevProps) {
    const { error, authenticated } = this.props;
    if (error !== prevProps.error) {
      // check for login/register error
      if (error.id === "LOGIN_FAIL" || error.id === "REGISTER_FAIL") {
        this.setState({ msg: error.msg });
        console.log(error.msg);
      } else {
        this.setState({ msg: null });
      }
    } else if (this.props.open) {
      if (authenticated && this.state.msg) {
        this.props.clearErrors();
      }
    }
  }
  // on change for fields.
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // form submit
  onSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    if (this.props.title === "Sign Up") {
      const { name, group } = this.state;
      this.props.registerUser({ group, name, email, password });
    } else if (this.props.title === "Login") {
      this.props.loginUser({ email, password });
    }
  };

  // this is to clear errors, if any
  localToggle = () => {
    if (this.state.msg) this.props.clearErrors();
    this.props.toggle();
  };

  render() {
    return (
      <Fragment>
        <div className="flex justify-center mt-2 mb-4 md:mb-8">
          <Title />
        </div>
        <p className="text-4xl text-center font-medium">{this.props.title}</p>
        <img src={left} alt="" className="-z-1 bottom-0 absolute sm:max-w-lg" />
        <img
          src={right}
          alt=""
          className="hidden md:block -z-1 top-0 right-0 absolute max-w-lg"
        />
        <div className="flex justify-center items-center">
          <form
            className="mx-6 max-w-xs mb-8 sm:mx-auto w-full sm:max-w-sm lg:max-w-lg"
            onSubmit={this.onSubmit}
          >
            {/* Error message */}
            {this.state.msg ? (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-4 rounded relative"
                role="alert"
              >
                <strong className="font-bold">{this.state.msg.msg}</strong>
              </div>
            ) : null}
            {this.props.items.map(item => (
              <FormInput key={item} name={item} onChange={this.onChange} />
            ))}
            <div className="flex justify-center">
              <button className="px-8 py-1 lg:px-16 lg:py-2 mt-8 mx-auto lg:text-xl border-2 border-violet rounded-sm shadow-card bg-white text-violet text-center font-bold focus:outline-none hover:bg-violet-dark hover:border-violet-dark hover:text-white transition-all">
                {this.props.title.toUpperCase()}
              </button>
            </div>
            {this.props.title === "Login" ? (
              <p className="text-center mt-6 lg:mt-10 font-medium text-lg lg:text-xl">
                Not a user? Sign up{" "}
                <Link
                  to="/sign-up"
                  className="text-violet-dark font-bold cursor-pointer"
                >
                  Here
                </Link>
              </p>
            ) : null}
          </form>
        </div>
        {this.props.authenticated ? <Redirect to="/app" /> : null}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated,
  error: state.error
});

export default connect(mapStateToProps, {
  loginUser,
  registerUser,
  clearErrors
})(Form);
