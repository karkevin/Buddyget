import React, { Component } from "react";
import Modal from "react-modal";

// Redux imports
import { connect } from "react-redux";
import { registerUser } from "../../redux/actions/authActions";
import PropTypes from "prop-types";

class RegisterModal extends Component {
  static propTypes = {
    registerUser: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired
  };

  render() {
    return (
      <Modal
        isOpen={this.props.open}
        contentLabel="Register Modal"
        toggleModal={this.props.toggle}
        ariaHideApp={false}
        className="bg-white w-11/12 mt-24 m-auto max-w-lg px-4 rounded shadow-lg z-50 overflow-y-auto focus:outline-none"
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
            onClick={this.props.toggle}
          >
            x
          </button>
        </div>

        <hr />
        <form className="mt-2 mb-8" action="">
          <div className="mb-4">
            <label className="block my-3 mt-5">Family:</label>
            <input
              type="text"
              name="group"
              className="shadow appearance-none w-full py-1 px-2 focus:outline-none rounded border border-gray-500 border-solid"
              placeholder="Group"
            />
          </div>
          <div className="mb-4">
            <label className="block my-3">Full Name:</label>
            <input
              type="text"
              name="name"
              className="shadow appearance-none w-full py-1 px-2 focus:outline-none rounded border border-gray-500 border-solid"
              placeholder="Full Name"
            />
          </div>
          <div className="mb-4">
            <label className="block my-3">Email:</label>
            <input
              type="email"
              name="email"
              className="shadow appearance-none w-full py-1 px-2 focus:outline-none rounded border border-gray-500 border-solid"
              placeholder="Email"
            />
          </div>
          <div className="mb-4">
            <label className="block my-3">Password:</label>
            <input
              type="password"
              name="password"
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

export default RegisterModal;
