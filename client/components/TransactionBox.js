import React, { Component } from "react";

export default class TransactionBox extends Component {
  render() {
    const { id, source, destination, money } = this.props.transaction;
    const user = this.props.user;
    const other = source === user ? destination : source;
    const owe =
      (money > 0 && source === user) || (money < 0 && destination === user)
        ? true
        : false;

    return (
      <div className="text-center p-4 mb-16">
        <p className="text-lg">{owe ? `You owe` : `${other} owes`}</p>
        <p className="text-2xl">{owe ? `${other}:` : `you:`}</p>
        <p
          className={`${
            owe ? "text-red-400" : "text-green-400"
          } font-montserrat text-3xl`}
        >
          ${Math.abs(money).toFixed(2)}
        </p>
      </div>
    );
  }
}
