import React, { Component } from "react";
import Layout from "../components/Layout";
import LoginModal from "../components/modals/LoginModal";
import RegisterModal from "../components/modals/RegisterModal";

import logo from "../../public/logo.png";

class Register extends Component {
  state = {
    register: false,
    login: false
  };

  toggleRegisterModal = () => {
    this.setState({ register: !this.state.register });
  };

  toggleLoginModal = () => {
    this.setState({ login: !this.state.login });
  };

  render() {
    return (
      <Layout>
        <div id="modal" className="text-center mt-48 m-auto">
          <p className="text-4xl mb-2">Welcome to</p>
          <img src={logo} alt="BuddyGet" className="w-64 mx-auto mb-8" />
          <div className="flex flex-wrap items-center justify-center">
            <button
              className="p-1 rounded bg-purple-500 text-white px-3 focus:outline-none hover:bg-purple-600"
              onClick={this.toggleRegisterModal}
            >
              Register
            </button>
            <button
              className="ml-6 p-1 rounded bg-purple-500 text-white px-3 focus:outline-none hover:bg-purple-600"
              onClick={this.toggleLoginModal}
            >
              Login
            </button>
          </div>

          <RegisterModal
            open={this.state.register}
            toggle={this.toggleRegisterModal}
          />
          <LoginModal open={this.state.login} toggle={this.toggleLoginModal} />
        </div>
      </Layout>
    );
  }
}

export default Register;
