import React, { Component } from "react";

import TransactionBox from "./TransactionBox";

class Transaction extends Component {
  state = {
    user: "Allan",
    transactions: [
      { id: 1, source: "Yunzhi", destination: "Allan", money: -10.12 },
      { id: 2, source: "Allan", destination: "Kevin", money: -10.34 },
      { id: 3, source: "Dave", destination: "Allan", money: 20.12324 }
    ]
  };

  render() {
    return (
      <div>
        <div id="Expenses" className="text-center">
          <h1
            className="font-raleway text-xl mb-6"
            style={{ marginTop: "6.5rem" }}
          >
            Total Expenses:
          </h1>
          <p className="font-montserrat text-5xl mb-8">$ 123.45</p>
        </div>

        <div id="TransactionBoxes" className="flex flex-wrap justify-center">
          {this.state.transactions.map(transaction => (
            <TransactionBox
              key={transaction.id}
              transaction={transaction}
              user={this.state.user}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Transaction;
