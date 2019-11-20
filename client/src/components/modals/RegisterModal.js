import React, { Component } from "react";
import Modal from "react-modal";

// Redux imports
import { connect } from "react-redux";
import { registerUser } from "../../redux/actions/authActions";
import { clearErrors } from "../../redux/actions/errorActions";
import PropTypes from "prop-types";

class RegisterModal extends Component {
  static propTypes = {
    registerUser: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired
  };

  state = {
    group: "",
    name: "",
    username: "",
    email: "",
    password: "",
    msg: null
  };

  componentDidUpdate(prevProps) {
    const { error, authenticated } = this.props;
    if (error !== prevProps.error) {
      if (error.id === "REGISTER_FAIL") {
        this.setState({ msg: error.msg });
        console.log(error.msg);
      } else {
        this.setState({ msg: null });
      }
    } else if (this.props.open && authenticated) {
      this.localToggle();
    }
  }

  onSubmit = e => {
    e.preventDefault();
    const { group, name, username, email, password } = this.state;
    this.props.registerUser({ group, name, email, username, password });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  localToggle = () => {
    if (this.state.msg) this.props.clearErrors();
    this.props.toggle();
  };

  render() {
    return (
      <Modal
        isOpen={this.props.open}
        contentLabel="Register Modal"
        toggleModal={this.localToggle}
        ariaHideApp={false}
        className="bg-white w-11/12 mt-5 sm:mt-24 m-auto max-w-lg px-4 rounded shadow-lg z-50 overflow-y-auto focus:outline-none"
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(150,152,154, 0.55)"
          }
        }}
      >
        <div className="flex justify-between py-2 mb-2">
          <p className="text-xl">Register</p>
          <button
            className="text-lg px-2 rounded bg-red-400 hover:bg-red-500"
            onClick={this.localToggle}
          >
            x
          </button>
        </div>
        {this.state.msg ? (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 my-1 rounded relative"
            role="alert"
          >
            <strong className="font-bold">{this.state.msg.msg}</strong>
          </div>
        ) : null}

        <hr />
        <form className="mt-2 mb-8" onSubmit={this.onSubmit}>
          <div className="mb-4">
            <label className="block my-3 mt-5">Group:</label>
            <input
              type="text"
              name="group"
              onChange={this.onChange}
              className="shadow appearance-none w-full py-1 px-2 focus:outline-none rounded border border-gray-500 border-solid"
              placeholder="Group"
            />
          </div>
          <div className="mb-4">
            <label className="block my-3">Full Name:</label>
            <input
              type="text"
              name="name"
              onChange={this.onChange}
              className="shadow appearance-none w-full py-1 px-2 focus:outline-none rounded border border-gray-500 border-solid"
              placeholder="Full Name"
            />
          </div>
          <div className="mb-4">
            <label className="block my-3 mt-5">Username:</label>
            <input
              type="text"
              name="username"
              onChange={this.onChange}
              className="shadow appearance-none w-full py-1 px-2 focus:outline-none rounded border border-gray-500 border-solid"
              placeholder="Username"
            />
          </div>
          <div className="mb-4">
            <label className="block my-3">Email:</label>
            <input
              type="email"
              name="email"
              onChange={this.onChange}
              className="shadow appearance-none w-full py-1 px-2 focus:outline-none rounded border border-gray-500 border-solid"
              placeholder="Email"
            />
          </div>
          <div className="mb-4">
            <label className="block my-3">Password:</label>
            <input
              type="password"
              name="password"
              onChange={this.onChange}
              className="shadow appearance-none w-full py-1 px-2 focus:outline-none rounded border border-gray-500 border-solid"
              placeholder="Password"
            />
          </div>
          <button className="flex bg-blue-500 hover:bg-blue-600 mx-auto mt-8 px-5 py-1 rounded text-white focus:outline-none items-center">
            Register
            <svg
              className="inline ml-1"
              width="17"
              height="14"
              viewBox="0 0 17 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.5075 13.75L16.25 7L0.5075 0.25L0.5 5.5L11.75 7L0.5 8.5L0.5075 13.75Z"
                fill="white"
              />
            </svg>
          </button>
        </form>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated,
  error: state.error
});

export default connect(mapStateToProps, { registerUser, clearErrors })(
  RegisterModal
);
