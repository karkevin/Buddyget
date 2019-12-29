import React, { Component } from "react";
import LoginModal from "../components/modals/LoginModal";
import RegisterModal from "../components/modals/RegisterModal";

export default class Buttons extends Component {
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
      <div>
        <button
          className="px-3 py-1 lg:px-6 lg:py-2 lg:text-xl rounded-sm shadow-card border-2 bg-violet border-violet text-white font-roboto font-bold focus:outline-none hover:bg-violet-dark hover:border-violet-dark transition-all"
          onClick={this.toggleRegisterModal}
        >
          SIGN UP
        </button>

        <button
          className="ml-2 md:ml-5 px-3 py-1 lg:px-6 lg:py-2 lg:text-xl rounded-sm shadow-card border-2 bg-white border-violet text-violet font-roboto font-bold focus:outline-none hover:bg-violet hover:text-white transition-all"
          onClick={this.toggleLoginModal}
        >
          LOGIN
        </button>

        <RegisterModal
          open={this.state.register}
          toggle={this.toggleRegisterModal}
        />
        <LoginModal open={this.state.login} toggle={this.toggleLoginModal} />
      </div>
    );
  }
}
