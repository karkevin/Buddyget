import React, { Component } from "react";

import TransactionBox from "./TransactionBox";
import { getGroup } from "../redux/actions/groupActions";

import { connect } from "react-redux";

class Transaction extends Component {
  getTransactions = () => {
    if (!this.props.group.group.transactions) {
      return [];
    } else {
      const filteredTransactions = this.props.group.group.transactions.filter(
        transaction => {
          return (
            transaction.source._id === this.props.user._id ||
            transaction.destination._id === this.props.user._id
          );
        }
      );
      const transactionBoxes = filteredTransactions.map(transaction => (
        <TransactionBox
          key={transaction._id}
          transaction={transaction}
          user={this.props.user.name}
        />
      ));
      return transactionBoxes;
    }
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
          <p className="font-montserrat text-5xl sm:text-6xl mb-8">
            {`$ ${
              !this.props.group.group.totalExpenses
                ? (0).toFixed(2)
                : parseFloat(this.props.group.group.totalExpenses).toFixed(2)
            }`}
          </p>
        </div>

        <div
          id="TransactionBoxes"
          className="flex flex-wrap justify-center mb-10"
        >
          {this.getTransactions()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  group: state.group,
  user: state.auth.user
});

export default connect(mapStateToProps, {})(Transaction);
