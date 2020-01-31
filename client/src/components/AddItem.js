import React, { Component } from "react";

import { connect } from "react-redux";
import { addItem } from "../redux/actions/itemActions";
import PropTypes from "prop-types";

import ItemModal from "./modals/ItemModal";

class AddItem extends Component {
  static propTypes = {
    addItem: PropTypes.func.isRequired
  };
  state = {
    showItemModal: false
  };

  initialItem = {
    buyer: "",
    location: "",
    buyerGroup: [],
    price: 0,
    date: getCurrentDate(),
    msg: null
  };

  toggle = () => {
    this.setState({ showItemModal: !this.state.showItemModal });
  };
  render() {
    return (
      <div>
        <ItemModal
          modal={this.state.showItemModal}
          toggle={this.toggle}
          action={this.props.addItem}
          initialItem={this.initialItem}
          item={this.initialItem}
          name="Add"
        />
        <button
          className="z-10 fixed bottom-0 left-1/2 text-center text-white font-bold 
              shadow-card block h-12 w-12 z-1 rounded-full text-4xl mx-auto mb-8 focus:outline-none 
              bg-violet hover:bg-violet-dark transition-bg md:w-64 md:text-2xl md:rounded-lg"
          style={{
            transform: "translate(-50%, 0)"
          }}
          onClick={this.toggle}
        >
          <p className="md:hidden">+</p>
          <p className="hidden md:block">ADD EXPENSE</p>
        </button>
      </div>
    );
  }
}

const getCurrentDate = () => {
  let date = new Date();
  return (
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
  );
};

export default connect(null, { addItem })(AddItem);
