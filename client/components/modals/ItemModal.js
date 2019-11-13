import React, { Component } from "react";
import Modal from "react-modal";

// update/delete from here, depending on this.state's values

class ItemModal extends Component {
  state = {
    buyer: this.props.item.buyer.name,
    location: this.props.item.location,
    buyerGroup: this.props.item.buyerGroup,
    date: this.props.item.date,
    price: this.props.item.price
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
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
            <button className="text-lg text-white mr-8 px-1 rounded bg-red-600 hover:bg-red-700 focus:outline-none">
              Delete
            </button>
            <button
              className="text-lg px-2 rounded bg-red-400 hover:bg-red-500 focus:outline-none"
              onClick={this.props.toggle}
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
              onChange={this.onChange}
              className="shadow appearance-none w-full py-1 px-2 focus:outline-none rounded border border-gray-500 border-solid"
              value={this.state.buyer}
            />
          </div>
          <div className="mb-4">
            <label className="block my-3">Location:</label>
            <input
              type="text"
              name="location"
              onChange={this.onChange}
              className="shadow appearance-none w-full py-1 px-2 focus:outline-none rounded border border-gray-500 border-solid"
              value={this.state.location}
            />
          </div>
          <div className="mb-4">
            <label className="block my-3">Price:</label>
            <input
              type="number"
              name="price"
              onChange={this.onChange}
              className="shadow appearance-none w-full py-1 px-2 focus:outline-none rounded border border-gray-500 border-solid"
              value={this.state.price}
            />
          </div>
          <div className="mb-5">
            <label className="block my-3">BuyerGroup:</label>
            <div className="flex items-center justify-start">
              {this.state.buyerGroup.map(member => (
                <span className="mr-8" key={member._id}>
                  <input
                    type="checkbox"
                    name={member.name}
                    value={member.name}
                    onChange={this.onChange}
                    className="mr-1"
                  />
                  {member.name}
                </span>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block my-3">Date:</label>
            <input
              type="date"
              name="date"
              value={this.state.date.substr(0, 10)}
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

export default ItemModal;
