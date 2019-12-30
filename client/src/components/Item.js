import React, { Component } from "react";

import ItemModal from "./modals/ItemModal";

class Item extends Component {
  state = {
    showItemModal: false
  };

  toggleItemModal = () => {
    this.setState({ showItemModal: !this.state.showItemModal });
  };

  // formats the date. Returns the formatted string.
  formatDate = () => {
    const weekNames = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];

    const date = new Date(this.props.item.date);
    return `${weekNames[date.getUTCDay()]} ${date.getUTCMonth() +
      1}/${date.getUTCDate()}`;
  };

  render() {
    // buyer is the an object
    var buyer = this.props.item.buyer.name;
    buyer = buyer.charAt(0).toUpperCase() + buyer.slice(1);
    const { location } = this.props.item;
    const { dateHeader } = this.props;
    const price = this.props.item.price.toFixed(2);
    const date = this.formatDate(this.props.date);

    return (
      <div>
        <ItemModal
          modal={this.state.showItemModal}
          item={this.props.item}
          toggle={this.toggleItemModal}
        />
        {dateHeader ? (
          <p className="text-left font-bold text-lg mt-8 mb-2">{date}</p>
        ) : null}
        <div className="mb-1 p-2 flex justify-between items-baseline bg-white rounded-sm shadow-md">
          <div className="text-left">
            <p className="inline-block text-xl">{buyer}</p> |{" "}
            <p className="inline-block">{location}</p>
          </div>
          <div className="flex">
            <p className="text-lg mr-2 font-montserrat">${price}</p>
            <button
              onClick={this.toggleItemModal}
              className="bg-blue-500 hover:bg-blue-600 p-2 rounded-full shadow-card focus:outline-none shadow-card transition-bg"
            >
              <svg
                className="w-3"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 528.899 528.899"
              >
                <g>
                  <path
                    d="M328.883,89.125l107.59,107.589l-272.34,272.34L56.604,361.465L328.883,89.125z M518.113,63.177l-47.981-47.981
                        c-18.543-18.543-48.653-18.543-67.259,0l-45.961,45.961l107.59,107.59l53.611-53.611
                        C532.495,100.753,532.495,77.559,518.113,63.177z M0.3,512.69c-1.958,8.812,5.998,16.708,14.811,14.565l119.891-29.069
                        L27.473,390.597L0.3,512.69z"
                    fill="white"
                  />
                </g>
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Item;
