import React, { Component } from "react";
import Layout from "../components/Layout";
import LoginModal from "../components/modals/LoginModal";
import RegisterModal from "../components/modals/RegisterModal";

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
        <div id="modal" className="text-center mt-64 m-auto">
          <p className="text-xl mb-2">Welcome to</p>
          <p className="text-4xl mb-16">BuddyGet</p>
          <div className="flex flex-wrap items-center justify-center">
            <button
              className="p-1 rounded bg-purple-400 text-white focus:outline-none hover:bg-purple-500"
              onClick={this.toggleRegisterModal}
            >
              Register
            </button>
            <button
              className="ml-6 p-1 rounded bg-purple-400 text-white focus:outline-none hover:bg-purple-500"
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
