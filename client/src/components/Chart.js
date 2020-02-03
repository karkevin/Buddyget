import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
import { connect } from "react-redux";

class Chart extends Component {
  state = {
    labels: [],
    datasets: [
      {
        label: "Spendings",
        backgroundColor: [
          "#EB5757",
          "#F2C94C",
          "#27AE60",
          "#2D9CDB",
          "#F2994A"
        ],
        data: []
      }
    ]
  };

  static getDerivedStateFromProps = (props, state) => {
    if (
      Object.keys(props.chartData).length !== Object.keys(state.labels).length
    ) {
      return {
        labels: Object.keys(props.chartData),
        datasets: [
          {
            ...state.datasets[0],
            data: Object.values(props.chartData)
          }
        ]
      };
    }
    return null;
  };

  options = {
    responsive: true,
    maintainAspectRatio: false
  };

  render() {
    return (
      <div className="mb-16 md:mb-0">
        <p className="text-center text-3xl mb-6 md:mb-8">Analytics</p>
        <div className="flex justify-center md:shadow-lg mx-4 md:h-50vh">
          <div className="h-40vh pt-6">
            <p className="text-center text-2xl mb-3">Spendings per User</p>
            <Doughnut data={this.state} width={250} options={this.options} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item,
  group: state.group
});

export default connect(mapStateToProps, {})(Chart);
