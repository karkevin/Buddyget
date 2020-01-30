import React, { Component } from "react";

import TransactionBox from "./TransactionBox";
// import { getGroup } from "../redux/actions/groupActions";

import { connect } from "react-redux";

class Transaction extends Component {
  getTransactions = () => {
    if (this.props.group.loading) {
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
          user={this.props.user}
        />
      ));
      return transactionBoxes;
    }
  };

  render() {
    return (
      <div>
        <div id="Expenses" className="text-center">
          <h1 className="font-raleway text-xl mb-6">Total Expenses:</h1>
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
          className="flex flex-wrap justify-center mb-6"
        >
          {this.getTransactions()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  group: state.group,
  user: state.auth.user,
  authLoading: state.auth.loading
});

export default connect(mapStateToProps, {})(Transaction);
