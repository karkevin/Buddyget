import React, { Component } from "react";
import TransactionModal from "./modals/TransactionModal";

const capitalize = name => {
  return name.charAt(0).toUpperCase() + name.substring(1);
};

class TransactionBox extends Component {
  state = {
    modal: false
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  render() {
    // depending on source and destinaion, do the required calculations to seend correct fields to backend.
    const { source, destination, money } = this.props.transaction;
    const userName = this.props.user.name;
    let other = source.name === userName ? destination.name : source.name;
    other = capitalize(other);
    const owe =
      (money > 0 && source.name === userName) ||
      (money < 0 && destination.name === userName)
        ? true
        : false;

    return (
      <div className="text-center p-5 mb-2 w-40">
        <TransactionModal
          modal={this.state.modal}
          transaction={this.props.transaction}
          user={this.props.user}
          otherName={other}
          toggle={this.toggle}
        />
        <p className="text-lg">{owe ? `You owe` : `${other} owes`}</p>
        <p className="text-2xl">{owe ? `${other}:` : `you:`}</p>
        <p
          className={`${
            owe ? "text-red-400" : "text-green-400"
          } font-montserrat text-3xl`}
        >
          ${Math.abs(money).toFixed(2)}
        </p>
        <button
          onClick={this.toggle}
          className="bg-yellow-400 focus:outline-none hover:bg-yellow-500 rounded w-full shadow-card py-1 text-white font-bold transition-bg"
        >
          UPDATE
        </button>
      </div>
    );
  }
}

export default TransactionBox;
