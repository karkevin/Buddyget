import React, { Component } from "react";
// Allows a state to be connected to this component.
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Item from "./Item";
import Chart from "./Chart";

class ItemList extends Component {
  state = {
    data: {}
  };
  static propTypes = {
    item: PropTypes.object.isRequired
  };

  data = {};

  renderList = items => {
    let currDate = null;
    return (
      <div
        name="ItemList"
        className="w-3/4 md:w-auto m-auto max-w-2xl md:max-w-xl md:rounded md:h-70vh overflow-y-scroll md:shadow-lg md:px-4 md:pb-6"
      >
        {items.map(item => {
          const name = item.buyer.name;
          this.data[name] = this.data[name]
            ? this.data[name] + item.price
            : item.price;
          if (item.date !== currDate) {
            currDate = item.date;
            return <Item key={item._id} item={item} dateHeader={true} />;
          }
          return <Item key={item._id} item={item} />;
        })}
      </div>
    );
  };

  render() {
    const { items } = this.props.item;
    return (
      <div className="flex flex-col md:flex-row">
        <div className="flex-1">
          <p className="hidden md:block text-center text-3xl mb-8">Expenses</p>
          <div className="w-full text-center mb-10">
            {!items.loading ? this.renderList(items) : null}
          </div>
        </div>
        <div className="flex-1">
          <Chart chartData={this.data} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item
});

export default connect(mapStateToProps, null)(ItemList);
