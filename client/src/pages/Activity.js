import React, { Component } from "react";
import { connect } from "react-redux";

import Layout from "../components/layout/Layout";
import ActivityItem from "../components/ActivityItem";

class Activity extends Component {
  activityBox = (
    <div>
      <p className="text-center text-3xl mb-8">Activity</p>
      <div className="m-auto shadow-lg overflow-y-scroll px-4 pt-6 max-w-xl md:h-70vh rounded">
        {this.props.group.group.logs.reverse().map(log => {
          return <ActivityItem key={log._id} log={log} />;
        })}
      </div>
    </div>
  );
  render() {
    if (window.innerWidth < 768) {
      return (
        <Layout page="activity">
          {<div className="mx-3 mb-24 xs:mx-8">{this.activityBox}</div>}
        </Layout>
      );
    } else {
      return <div>{this.activityBox}</div>;
    }
  }
}

const mapStateToProps = state => ({
  group: state.group
});

export default connect(mapStateToProps, {})(Activity);
