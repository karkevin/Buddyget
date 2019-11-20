import React, { Component } from "react";

const capitalize = name => {
  return name.charAt(0).toUpperCase() + name.substring(1);
};

export default class TransactionBox extends Component {
  render() {
    const { source, destination, money } = this.props.transaction;
    const user = this.props.user;
    const other = source.name === user ? destination.name : source.name;
    const owe =
      (money > 0 && source.name === user) ||
      (money < 0 && destination.name === user)
        ? true
        : false;

    return (
      <div className="text-center p-5 mb-2">
        <p className="text-lg">
          {owe ? `You owe` : `${capitalize(other)} owes`}
        </p>
        <p className="text-2xl">{owe ? `${capitalize(other)}:` : `you:`}</p>
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
