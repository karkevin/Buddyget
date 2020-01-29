import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

// components
import Nav from "../components/Nav";
import Transactions from "../components/Transactions";
import ItemList from "../components/ItemList";
import AddItemModal from "../components/modals/AddItemModal";
import Footer from "../components/Footer";
import BottomMenu from "../components/BottomMenu";

class Home extends Component {
  state = {
    showItemModal: false
  };

  toggle = () => {
    this.setState({ showItemModal: !this.state.showItemModal });
  };

  render() {
    return (
      <Fragment>
        <div>
          <Nav />
          <Transactions />
          <ItemList />
          <div className="mb-20"></div>
          <button
            className="z-10 fixed bottom-0 left-1/2 text-center text-white font-bold 
              shadow-card block h-12 w-12 z-1 rounded-full text-4xl mx-auto mb-8 md:mb-12 focus:outline-none 
              bg-violet hover:bg-violet-dark transition-bg md:w-64 md:text-2xl md:rounded-lg"
            style={{
              transform: "translate(-50%, 0)"
            }}
            onClick={this.toggle}
          >
            {window.innerWidth < 768 ? "+" : "ADD EXPENSE"}
          </button>
          <Footer />
          <BottomMenu page="app" />
          <AddItemModal modal={this.state.showItemModal} toggle={this.toggle} />
        </div>
      </Fragment>
    );
  }
}

export default Home;
