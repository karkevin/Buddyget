import React, { Component } from "react";

// components
import Nav from "../components/Nav";
import Transactions from "../components/Transactions";
import ItemList from "../components/ItemList";
import Layout from "../components/Layout";
import AddItemModal from "../components/modals/AddItemModal";

class Home extends Component {
  state = {
    showItemModal: false
  };

  toggle = () => {
    this.setState({ showItemModal: !this.state.showItemModal });
  };

  render() {
    return (
      <Layout>
        <div>
          <Nav />
          <Transactions />

          <ItemList />
          <div className="mb-20"></div>
          <button
            className=" fixed bottom-0 left-1/2 flex justify-center block h-12 w-12 z-1 rounded-full text-4xl mx-auto mb-8 focus:outline-none"
            style={{
              backgroundColor: "#788CFF",
              transform: "translate(-50%, 0)"
            }}
            onClick={this.toggle}
          >
            +
          </button>
          <AddItemModal modal={this.state.showItemModal} toggle={this.toggle} />
          <footer className="bottom-0 text-left mb-5 ml-5 text-md">
            <p className="w-20 mb-2 sm:w-full">Made by Kevin Xu</p>
            <a
              href="https://github.com/karkevin"
              className="text-lg hover:font-bold"
            >
              Github
              <span className="pl-1">&#x1F4A1;</span>
            </a>
          </footer>
        </div>
      </Layout>
    );
  }
}

export default Home;
