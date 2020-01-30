import React, { Component } from "react";
// Allows a state to be connected to this component.
import { connect } from "react-redux";
import { getGroupItems } from "../redux/actions/itemActions";
import PropTypes from "prop-types";

import Item from "./Item";

class ItemList extends Component {
  static propTypes = {
    getGroupItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired
  };

  // ? after making an API request, mount the component.
  componentDidMount() {
    // calls the method to dispatch action to reducer.
    if (!this.props.group.loading) {
      // TODO im confused
      // this.props.getGroupItems(this.props.group.group.id);
    }
  }

  // Renders the list.
  // Precondition: items.loading === False
  renderList = items => {
    let currDate = null;
    console.log(this.props.group.group.id);
    return (
      <div
        name="ItemList"
        className="w-3/4 md:w-auto m-auto max-w-2xl md:max-w-xl md:rounded md:h-80vh overflow-y-scroll md:shadow-lg md:px-4 md:pb-6"
      >
        {items.map(item => {
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
      <div>
        <p className="hidden md:block text-center text-3xl mb-8">Expenses</p>
        <div className="w-full text-center mb-10">
          {!items.loading ? this.renderList(items) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item,
  group: state.group
});

export default connect(mapStateToProps, { getGroupItems })(ItemList);
