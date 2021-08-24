import { Grid, makeStyles } from "@material-ui/core";
import React from "react";
import BarGraph from "../../../Helper/VisxGraph";
import DHomePage from "../../DHomePage";
import "./dashboard.css";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  control: {
    padding: theme.spacing(2),
  },
}));
const labels = ["January", "February", "March", "April", "May", "June"];
const data = {
  labels: labels,
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgb(255, 99, 132)",
      data: [0, 10, 5, 2, 20, 30, 45],
    },
  ],
};
const config = {
  type: "line",
  data: data,
  options: {},
};

// var myChart = new Chart(ctx, config);

function Dashboard() {
  const graph = BarGraph();
  const classes = useStyles();
  return (
    <DHomePage sidebar>
      <div className="dashboard">
        <div className="dashboard_content">
          <div className="dashboard_content_header">DashBoard</div>
          <div className="dashboard_content_main">
            <div className="dashboard_content_top">
              <div className="dashboard_top_item"></div>
            </div>
            <div className="dashboard_content_bottom">
              <div className="dashboard_bottom_item"></div>
            </div>
          </div>
        </div>
      </div>
    </DHomePage>
  );
}

export default Dashboard;
