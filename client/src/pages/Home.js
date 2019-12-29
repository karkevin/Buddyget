import React, { Component, Fragment } from "react";

// components
import Nav from "../components/Nav";
import Transactions from "../components/Transactions";
import ItemList from "../components/ItemList";
import AddItemModal from "../components/modals/AddItemModal";
import Footer from "../components/Footer";

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
            className="fixed bottom-0 left-1/2 flex justify-center text-white font-bold 
              shadow-card block h-12 w-12 z-1 rounded-full text-4xl mx-auto mb-8 focus:outline-none 
              bg-violet hover:bg-violet-dark transition-bg md:w-64 md:text-2xl md:rounded-lg"
            style={{
              transform: "translate(-50%, 0)"
            }}
            onClick={this.toggle}
          >
            {window.innerWidth < 768 ? "+" : "ADD EXPENSE"}
          </button>
          <AddItemModal modal={this.state.showItemModal} toggle={this.toggle} />
          <Footer />
        </div>
      </Fragment>
    );
  }
}

export default Home;
