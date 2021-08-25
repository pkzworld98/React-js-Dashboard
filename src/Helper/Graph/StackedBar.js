import React from "react";
import { Bar } from "react-chartjs-2";

const data = {
  labels: ["1", "2", "3", "4", "5", "6"],
  datasets: [
    {
      label: "# of Red Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: "white",
    },
    {
      label: "# of Blue Votes",
      data: [2, 3, 20, 5, 1, 4],
      backgroundColor: "grey",
    },
    {
      label: "# of Green Votes",
      data: [3, 10, 13, 15, 22, 30],
      backgroundColor: "rgb(197, 146, 5)",
    },
  ],
};

const options = {
  scales: {
    yAxes: [
      {
        stacked: true,
        ticks: {
          beginAtZero: true,
        },
      },
    ],
    xAxes: [
      {
        stacked: true,
      },
    ],
  },
};

const StackedBar = () => (
  <>
    <div className="header"></div>
    <Bar data={data} options={options} />
  </>
);

export default StackedBar;
