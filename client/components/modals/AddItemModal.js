import React, { Component } from "react";
import Modal from "react-modal";

// Redux imports
import { connect } from "react-redux";
import { addItem } from "../../redux/actions/itemActions";
import { clearErrors } from "../../redux/actions/errorActions";
import PropTypes from "prop-types";

const initialState = {
  buyer: "",
  location: "",
  buyerGroup: [],
  price: 0,
  date: new Date(),
  msg: null
};

class AddItemModal extends Component {
  static propTypes = {
    addItem: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    group: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired,
    itemsLength: PropTypes.number,
    modal: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired
  };

  state = initialState;

  componentDidUpdate(prevProps) {
    const { error, itemsLength } = this.props;
    if (error !== prevProps.error) {
      // check for login error
      if (error.id === "ITEM_FAIL") {
        this.setState({ msg: error.msg });
      } else {
        this.setState({ msg: null });
      }
    } else if (this.props.modal && itemsLength !== prevProps.itemsLength) {
      this.toggle();
    }
  }

  // for normal form changes
  onChange = e => {
    if (e.target.name === "price") {
      this.setState({ [e.target.name]: parseFloat(e.target.value) });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  // updates based on user ID.
  buyerChange = e => {
    const name = e.target.value.toLowerCase();

    const user = this.props.group.group.users.find(user => user.name === name);

    user
      ? this.setState({ [e.target.name]: user._id })
      : this.setState({ [e.target.name]: "" });
  };

  // for checkbox
  onClick = e => {
    this.setState({ buyerGroup: this.checkUsers(e) });
  };

  toggle = () => {
    if (this.state.msg) this.props.clearErrors();
    this.setState(initialState);
    this.props.toggle();
  };

  checkUsers = e => {
    // The clicked user.
    const userId = e.target.value;
    for (let i = 0; i < this.state.buyerGroup.length; i++) {
      if (this.state.buyerGroup[i] === userId) {
        this.state.buyerGroup.splice(i, 1);
        return this.state.buyerGroup;
      }
    }

    // element is not in the list => add to list.
    return [...this.state.buyerGroup, userId];
  };

  onSubmit = e => {
    e.preventDefault();

    const { buyer, price, location, buyerGroup, date } = this.state;

    const newItem = {
      buyer,
      price,
      location,
      buyerGroup,
      date
    };

    // Add item via the addItem action
    this.props.addItem(newItem);
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
        contentLabel="Add Item Modal"
        ariaHideApp={false}
        className="bg-white w-11/12 mt-16 m-auto md:mt-6 px-4 max-w-lg rounded shadow-lg z-50 overflow-y-auto focus:outline-none"
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
          <p className="text-xl ">Add Item</p>
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
          <div className="mb-4">
            <label className="block my-3">Buyer:</label>
            <input
              type="text"
              name="buyer"
              onChange={this.buyerChange}
              className="shadow appearance-none w-full py-1 px-2 focus:outline-none rounded border border-gray-500 border-solid"
              placeholder="Buyer"
            />
          </div>
          <div className="mb-4">
            <label className="block my-3">Location:</label>
            <input
              type="text"
              name="location"
              onChange={this.onChange}
              className="shadow appearance-none w-full py-1 px-2 focus:outline-none rounded border border-gray-500 border-solid"
              placeholder="Location"
            />
          </div>
          <div className="mb-4">
            <label className="block my-3">Price:</label>
            <input
              type="number"
              name="price"
              step=".01"
              onChange={this.onChange}
              className="shadow appearance-none w-full py-1 px-2 focus:outline-none rounded border border-gray-500 border-solid"
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
              onChange={this.onChange}
              className="shadow appearance-none w-full py-1 px-2 focus:outline-none rounded border border-gray-500 border-solid"
            />
          </div>
          <button className="flex bg-blue-500 hover:bg-blue-600 mx-auto mt-8 px-5 py-1 rounded text-white focus:outline-none items-center">
            Add Item
          </button>
        </form>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  group: state.group,
  error: state.error,
  itemsLength: state.item.items.length
});

export default connect(mapStateToProps, { addItem, clearErrors })(AddItemModal);
