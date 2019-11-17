import React, { Component } from "react";
import Modal from "react-modal";

import { connect } from "react-redux";
import { deleteItem } from "../../redux/actions/itemActions";

// update/delete from here, depending on this.state's values
class ItemModal extends Component {
  initialState = {
    buyer: this.props.item.buyer._id,
    location: this.props.item.location,
    buyerGroup: this.props.item.buyerGroup.map(user => user._id),
    date: this.props.item.date,
    price: this.props.item.price,
    itemId: this.props.item._id
  };

  state = this.initialState;

  // updates based on user ID.
  buyerChange = e => {
    const name = e.target.value.toLowerCase();

    const user = this.props.group.group.users.find(user => user.name === name);

    user
      ? this.setState({ [e.target.name]: user._id })
      : this.setState({ [e.target.name]: "" });
  };

  // for normal form changes
  onChange = e => {
    if (e.target.name === "price") {
      this.setState({ [e.target.name]: parseInt(e.target.value) });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  checkUsers = e => {
    // The clicked user.
    console.log(e.target.value);
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

  deleteItem = () => {
    this.props.deleteItem(this.state.itemId);
    this.toggle();
  };
  toggle = () => {
    this.setState(this.initialState);
    this.props.toggle();
  };
  render() {
    let users = [];
    if (
      Object.keys(this.props.group.group).length &&
      !this.props.group.loading
    ) {
      users = this.props.group.group.users;
    }

    return (
      <Modal
        isOpen={this.props.modal}
        contentLabel="Item Edit Modal"
        ariaHideApp={false}
        className="bg-white w-11/12 mt-24 m-auto md:mt-20 px-4 max-w-lg rounded shadow-lg z-50 overflow-y-auto focus:outline-none"
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

        <hr />
        <form className="mt-2 mb-8" action="">
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
              onChange={this.onChange}
              className="shadow appearance-none w-full py-1 px-2 focus:outline-none rounded border border-gray-500 border-solid"
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

const mapStateToProps = state => ({
  group: state.group
});

export default connect(mapStateToProps, { deleteItem })(ItemModal);
