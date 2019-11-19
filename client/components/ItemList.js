import React, { Component } from "react";
// Allows a state to be connected to this component.
import { connect } from "react-redux";
import { getItems } from "../redux/actions/itemActions";
import PropTypes from "prop-types";

import Item from "./Item";

// Scroll to Transactions
import {
  Link,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller
} from "react-scroll";

class ItemList extends Component {
  static propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired
  };

  // ? after making an API request, mount the component.
  componentDidMount() {
    // calls the method to dispatch action to reducer.
    this.props.getItems();
  }

  render() {
    const { items } = this.props.item;
    return (
      <div className="w-full text-center mb-10">
        <Link to="ItemList" smooth={true} duration={1050} offset={-80}>
          <button className="text-center bg-gray-400 py-1 px-3 mb-12 rounded-lg focus:outline-none hover:bg-gray-500">
            Transactions
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
        <div name="ItemList" className="w-3/4 m-auto max-w-2xl">
          {items.map(item => (
            <Item key={item._id} item={item} />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item
});

export default connect(mapStateToProps, { getItems })(ItemList);
