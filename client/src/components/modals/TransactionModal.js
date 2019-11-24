import React, { Component } from "react";
import Modal from "react-modal";

// Redux imports
import { connect } from "react-redux";
import { clearErrors } from "../../redux/actions/errorActions";
import { updateTransaction } from "../../redux/actions/groupActions";
import PropTypes from "prop-types";

class TransactionModal extends Component {
  static propTypes = {
    updateTransaction: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    modal: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    transaction: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    otherName: PropTypes.string.isRequired
  };

  initialState = () => {
    const { source, money } = this.props.transaction;
    const { user } = this.props;
    const updatedMoney = source._id === user._id ? -1 * money : money;

    return { money: updatedMoney, msg: null };
  };

  state = this.initialState();

  componentDidUpdate(prevProps) {
    const { error, transaction } = this.props;
    if (error !== prevProps.error) {
      if (error.id === "TRANSACTION_FAIL") {
        this.setState({ msg: error.msg });
      } else {
        this.setState({ msg: null });
      }
    } else if (transaction !== prevProps.transaction) {
      this.setState(this.initialState());
      if (this.props.modal) this.toggle();
    }
  }

  toggle = () => {
    if (this.state.msg) this.props.clearErrors();
    this.setState(this.initialState());
    this.props.toggle();
  };

  // on change for fields.
  onChange = e => {
    this.setState({
      [e.target.name]: !e.target.value ? 0 : parseFloat(e.target.value)
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const { money } = this.state;
    const { user } = this.props;
    const { source, destination } = this.props.transaction;

    const updatedMoney = source._id === user._id ? -1 * money : money;

    const updatedTransaction = {
      source: source._id,
      destination: destination._id,
      money: updatedMoney
    };

    // Add item via the addItem action
    this.props.updateTransaction(updatedTransaction);
  };

  render() {
    return (
      <Modal
        isOpen={this.props.modal}
        contentLabel="Transaction Modal"
        toggleModal={this.toggle}
        ariaHideApp={false}
        className="bg-white w-11/12 mt-10 sm:mt-48 m-auto max-w-lg px-4 rounded shadow-lg z-50 overflow-y-auto focus:outline-none"
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
          <p className="text-xl">Update Transaction</p>
          <button
            className="text-lg px-2 rounded bg-red-400 hover:bg-red-500"
            onClick={this.toggle}
          >
            x
          </button>
        </div>
        {this.state.msg ? (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 my-1 rounded relative"
            role="alert"
          >
            <strong className="font-bold">{this.state.msg.msg}</strong>
          </div>
        ) : null}

        <hr />
        <form className="mt-2 mb-8" onSubmit={this.onSubmit}>
          <div className="flex flex-wrap items-center justify-center mb-4">
            <label className="my-3 mr-5">
              {this.state.money >= 0
                ? `${this.props.otherName} owes You`
                : `You owe ${this.props.otherName}`}
            </label>
            <input
              type="number"
              name="money"
              step=".01"
              onChange={this.onChange}
              className="font-montserrat shadow appearance-none w-24 sm:w-40 py-1 px-2 focus:outline-none rounded border border-gray-500 border-solid"
              defaultValue={this.state.money.toFixed(2)}
            />
          </div>
          <button className="flex bg-blue-500 hover:bg-blue-600 mx-auto mt-8 px-5 py-1 rounded text-white focus:outline-none items-center">
            Update
          </button>
        </form>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  error: state.error
});

export default connect(mapStateToProps, { clearErrors, updateTransaction })(
  TransactionModal
);
