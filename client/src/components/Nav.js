import React, { Component } from "react";

import Logout from "./Logout";

class Nav extends Component {
  state = {
    // start with the menu closed
    burger: false
  };

  burgerOpen = () => {
    this.setState({ burger: !this.state.burger });
  };

  render() {
    return (
      <nav className="fixed w-full top-0 flex flex-wrap items-center justify-between py-3 px-2 rounded-b-lg bg-violet">
        <p className="text-xl text-white font-bold text-3xl px-3">BuddyGet</p>
        <button
          onClick={this.burgerOpen}
          className="flex items-center px-3 text-blue-100 focus:outline-none sm:hidden"
        >
          <svg
            className="fill-current h-5 w-5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            {this.state.burger ? (
              <path
                fillRule="evenodd"
                d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
              />
            ) : (
              <path
                fillRule="evenodd"
                d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
              />
            )}
          </svg>
        </button>

        <div
          className={`${
            this.state.burger ? "block" : "hidden"
          } w-full block sm:flex sm:items-center sm:w-auto`}
        >
          <div className="text-sm sm:flex-grow px-3">
            <a
              href="https://github.com/karkevin"
              className="block mt-4 sm:inline-block sm:mt-0 text-blue-200 text-xl font-medium hover:text-white transition-all"
            >
              Github
            </a>
          </div>
          <div className="text-sm sm:flex-grow px-3">
            <Logout />
          </div>
        </div>
      </nav>
    );
  }
}

export default Nav;
