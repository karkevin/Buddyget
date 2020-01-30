import React, { Component } from "react";

// Scroll to Transactions
import { Link } from "react-scroll";

// components
import Transactions from "../components/Transactions";
import ItemList from "../components/ItemList";
import AddItemModal from "../components/modals/AddItemModal";
import Layout from "../components/layout/Layout";
import Activity from "./Activity";

class Home extends Component {
  state = {
    showItemModal: false
  };

  toggle = () => {
    this.setState({ showItemModal: !this.state.showItemModal });
  };

  render() {
    return (
      <Layout page="app">
        <Transactions />
        <div className="flex justify-center">
          <Link to="dashboard" smooth={true} duration={1050} offset={-80}>
            <button className="text-center font-medium text-xl bg-gray-400 py-1 px-8 mb-6 rounded-lg shadow-card focus:outline-none hover:bg-gray-500 transition-bg">
              <p className="md:hidden">Expenses</p>
              <p className="hidden md:block">Dashboard</p>
              <svg
                className="w-3 h-auto m-auto"
                version="1.0"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 700.000000 700.000000"
              >
                <g
                  transform="translate(0.000000,700.000000) scale(0.100000,-0.100000)"
                  fill="#000000"
                  stroke="none"
                >
                  <path
                    d="M289 5323 c-45 -7 -132 -66 -162 -109 -42 -60 -59 -140 -43 -208 7
                  -29 22 -69 34 -87 11 -19 108 -119 214 -224 668 -657 1795 -1767 2428 -2391
                  512 -505 578 -567 628 -591 62 -29 144 -30 218 -2 52 20 92 57 483 443 234
                  231 552 545 706 696 153 151 446 440 650 641 203 201 507 500 675 665 168 165
                  403 396 523 514 121 118 229 233 242 255 95 160 6 354 -181 396 -67 15 -144 0
                  -202 -39 -22 -15 -138 -121 -258 -237 -120 -115 -270 -259 -333 -320 -285
                  -273 -342 -327 -460 -442 -70 -67 -137 -131 -150 -142 -12 -11 -123 -116 -245
                  -233 -121 -117 -264 -253 -316 -303 -52 -49 -101 -97 -110 -105 -14 -14 -129
                  -125 -395 -380 -61 -58 -209 -200 -330 -316 -368 -352 -387 -369 -405 -369
                  -11 0 -58 38 -107 85 -48 46 -133 127 -188 179 -55 53 -161 154 -235 226 -74
                  71 -180 173 -235 225 -55 53 -206 197 -335 321 -447 428 -737 705 -1065 1019
                  -182 173 -386 369 -455 436 -260 251 -326 313 -364 343 -61 48 -140 67 -227
                  54z"
                  ></path>
                </g>
              </svg>
            </button>
          </Link>
        </div>
        <div id="dashboard" className="flex md:pt-10">
          <div className="flex-1">
            <ItemList />
          </div>
          <div className="flex-1 hidden md:block">
            <Activity />
          </div>
        </div>
        <div className="mb-24"></div>
        <AddItemModal modal={this.state.showItemModal} toggle={this.toggle} />
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
      </Layout>
    );
  }
}

export default Home;
