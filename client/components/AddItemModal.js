import React, { Component } from "react";
import Modal from "react-modal";

class AddItemModal extends Component {
  render() {
    const buyerGroup = ["Allan", "Yunzhi", "Kevin"];
    return (
      <Modal
        isOpen={this.props.modal}
        contentLabel="Item Edit Modal"
        ariaHideApp={false}
        className="bg-white w-11/12 mt-24 m-auto px-4 rounded shadow-lg z-50 overflow-y-auto focus:outline-none"
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
            onClick={this.props.toggle}
          >
            x
          </button>
        </div>

        <hr />
        <form className="mt-2 mb-8" action="">
          <div className="mb-4">
            <label className="block my-3">Buyer:</label>
            <input
              type="text"
              name="buyer"
              className="shadow appearance-none w-full py-1 px-2 focus:outline-none rounded border border-gray-500 border-solid"
              placeholder="Buyer"
            />
          </div>
          <div className="mb-4">
            <label className="block my-3">Location:</label>
            <input
              type="text"
              name="location"
              className="shadow appearance-none w-full py-1 px-2 focus:outline-none rounded border border-gray-500 border-solid"
              placeholder="Location"
            />
          </div>
          <div className="mb-4">
            <label className="block my-3">Price:</label>
            <input
              type="number"
              name="price"
              className="shadow appearance-none w-full py-1 px-2 focus:outline-none rounded border border-gray-500 border-solid"
            />
          </div>
          <div className="mb-5">
            <label className="block my-3">BuyerGroup:</label>
            <div className="flex items-center justify-start">
              {buyerGroup.map(member => (
                <span className="mr-8" key={member}>
                  <input
                    type="checkbox"
                    name={member}
                    value={member}
                    className="mr-1"
                  />
                  {member}
                </span>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block my-3">Date:</label>
            <input
              type="date"
              name="date"
              className="shadow appearance-none w-full py-1 px-2 focus:outline-none rounded border border-gray-500 border-solid"
              placeholder={Date()}
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

export default AddItemModal;
