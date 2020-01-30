import React, { Component } from "react";
import Modal from "react-modal";

import { connect } from "react-redux";
import { deleteItem, updateItem } from "../../redux/actions/itemActions";
import { clearErrors } from "../../redux/actions/errorActions";
import PropTypes from "prop-types";

// update/delete from here, depending on this.state's values
class ItemModal extends Component {
  static propTypes = {
    deleteItem: PropTypes.func.isRequired,
    updateItem: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    group: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired,
    modal: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired
  };

  initialState = {
    buyer: this.props.item.buyer._id,
    location: this.props.item.location,
    buyerGroup: this.props.item.buyerGroup.map(user => user._id),
    date: this.props.item.date,
    price: this.props.item.price,
    _id: this.props.item._id,
    msg: null
  };

  state = this.initialState;

  componentDidUpdate(prevProps) {
    const { error, item } = this.props;
    if (error !== prevProps.error) {
      if (error.id === "ITEM_FAIL") {
        this.setState({ msg: error.msg });
      } else {
        this.setState({ msg: null });
      }
    } else if (this.props.modal && item !== prevProps.item) {
      // update initialState to reflect state changes.
      this.initialState = {
        buyer: this.props.item.buyer._id,
        location: this.props.item.location,
        buyerGroup: this.props.item.buyerGroup.map(user => user._id),
        date: this.props.item.date,
        price: this.props.item.price,
        _id: this.props.item._id,
        msg: null
      };
      this.toggle();
    }
  }

  // updates based on user ID.
  buyerChange = e => {
    const name = e.target.value;

    const user = this.props.group.group.users.find(user => user.name === name);

    user
      ? this.setState({ [e.target.name]: user._id })
      : this.setState({ [e.target.name]: "" });
  };

  // for normal form changes
  onChange = e => {
    if (e.target.name === "price") {
      this.setState({
        [e.target.name]: !e.target.value ? null : parseFloat(e.target.value)
      });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  checkUsers = e => {
    // The clicked user.
    const userId = e.target.value;
    if (this.state.buyerGroup.indexOf(userId) >= 0) {
      return this.state.buyerGroup.filter(id => id !== userId);
    }

    // element is not in the list => add to list.
    return [...this.state.buyerGroup, userId];
  };

  // for checkbox
  onClick = e => {
    this.setState({ buyerGroup: this.checkUsers(e) });
  };

  // when delete button is clicked
  deleteItem = () => {
    this.props.deleteItem(this.state._id);
  };

  // Form submission to update an item
  onSubmit = e => {
    e.preventDefault();

    const { buyer, price, location, buyerGroup, date, _id } = this.state;

    const newItem = {
      buyer,
      price,
      location,
      buyerGroup,
      date,
      _id
    };

    // Add item via the addItem action
    this.props.updateItem(newItem);
  };

  toggle = () => {
    if (this.state.msg) this.props.clearErrors();
    this.setState(this.initialState);
    this.props.toggle();
  };

  getUsers = () => {
    if (this.props.group.loading) {
      return [];
    } else {
      return this.props.group.group.users;
    }
  };

  render() {
    const users = this.getUsers();

    return (
      <Modal
        isOpen={this.props.modal}
        contentLabel="Item Edit Modal"
        ariaHideApp={false}
        className="bg-white w-11/12 mt-5 sm:mt-16 m-auto md:mt-6 px-4 max-w-lg rounded shadow-lg overflow-y-auto focus:outline-none"
        style={{
          overlay: {
            zIndex: 1000,
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
          <p className="text-xl ">Edit Item</p>
          <div className="flex">
            <button
              onClick={this.deleteItem}
              className="text-lg text-white mr-8 px-1 rounded bg-red-600 hover:bg-red-700 focus:outline-none"
            >
              Delete
            </button>
            <button
              className="text-lg px-2 rounded bg-red-400 hover:bg-red-500 focus:outline-none"
              onClick={this.toggle}
            >
              x
            </button>
          </div>
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
          <div className="mb-4">
            <label className="block my-3">Buyer:</label>
            <input
              type="text"
              name="buyer"
              onChange={this.buyerChange}
              className="shadow appearance-none w-full py-1 px-2 focus:outline-none rounded border border-gray-500 border-solid"
              defaultValue={this.props.item.buyer.name}
            />
          </div>
          <div className="mb-4">
            <label className="block my-3">Location:</label>
            <input
              type="text"
              name="location"
              onChange={this.onChange}
              className="shadow appearance-none w-full py-1 px-2 focus:outline-none rounded border border-gray-500 border-solid"
              defaultValue={this.state.location}
            />
          </div>
          <div className="mb-4">
            <label className="block my-3">Price:</label>
            <input
              type="number"
              name="price"
              step=".01"
              onChange={this.onChange}
              className="font-montserrat shadow appearance-none w-full py-1 px-2 focus:outline-none rounded border border-gray-500 border-solid"
              defaultValue={this.state.price}
            />
          </div>
          <div className="mb-5">
            <label className="block my-3">BuyerGroup:</label>
            <div className="flex flex-wrap items-center justify-start">
              {users.map(user => (
                <span className="mr-8" key={user._id}>
                  <input
                    type="checkbox"
                    name={user.name}
                    value={user._id}
                    defaultChecked={
                      this.state.buyerGroup.indexOf(user._id) >= 0
                        ? true
                        : false
                    }
                    className="mr-1"
                    onChange={this.onClick}
                  />
                  {user.name}
                </span>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block my-3">Date:</label>
            <input
              type="date"
              name="date"
              defaultValue={this.state.date.substr(0, 10)}
              onChange={this.onChange}
              className="shadow appearance-none w-full py-1 px-2 focus:outline-none rounded border border-gray-500 border-solid"
            />
          </div>
          <button className="flex bg-blue-500 hover:bg-blue-600 mx-auto mt-8 px-5 py-1 rounded text-white focus:outline-none items-center">
            Update Item
          </button>
        </form>
      </Modal>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  group: state.group,
  error: state.error,
  item: state.item.items[state.item.items.indexOf(ownProps.item)]
});

export default connect(mapStateToProps, {
  deleteItem,
  updateItem,
  clearErrors
})(ItemModal);
