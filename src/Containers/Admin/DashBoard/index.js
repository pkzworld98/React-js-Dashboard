import { Grid, makeStyles } from "@material-ui/core";
import React from "react";

import DHomePage from "../../DHomePage";
import "./dashboard.css";
import { Chart, registerables } from "chart.js";
import DoughnutChart from "../../../Helper/Graph/Doughnut";

import StackedBar from "../../../Helper/Graph/StackedBar";
import { useSelector } from "react-redux";
import { RiUser6Line } from "react-icons/ri";
import { GrCart } from "react-icons/gr";

import { ImMobile } from "react-icons/im";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  control: {
    padding: theme.spacing(2),
  },
}));

// var myChart = new Chart(ctx, config);

function Dashboard() {
  const user = useSelector((state) => state.user.userlist).length;
  const cart = useSelector((state) => state.products.cartItems).length;
  const products = useSelector((state) => state.products.productList).length;

  const classes = useStyles();
  return (
    <DHomePage sidebar>
      <div className="dashboard">
        <div className="dashboard_content">
          <div className="dashboard_content_header">DashBoard</div>
          <div className="dashboard_content_main">
            <div className="dashboard_content_top">
              <div className="dashboard_top_item">
                <div className="dashboard_top_item_content">
                  <div className="dashboard_top_item_content_logo">
                    <RiUser6Line size="2rem" style={{ fill: "black" }} />
                  </div>
                  User
                </div>
                <div className="dashboard_top_item_content_value">{user}</div>
              </div>
              <div className="dashboard_top_item">
                <div className="dashboard_top_item_content">
                  <div className="dashboard_top_item_content_logo">
                    <ImMobile size="2rem" style={{ fill: "black" }} />
                  </div>
                  Product
                </div>
                <div className="dashboard_top_item_content_value">
                  {products}
                </div>
              </div>
              <div className="dashboard_top_item">
                <div className="dashboard_top_item_content">
                  <div className="dashboard_top_item_content_logo">
                    <GrCart size="2rem" style={{ fill: "black" }} />
                  </div>
                  Cart
                </div>
                <div className="dashboard_top_item_content_value">{cart}</div>
              </div>
            </div>
            <div className="dashboard_content_bottom">
              <div className="dashboard_bottom_iteml">
                <StackedBar className="b-itemr" />
              </div>
              <div className="dashboard_bottom_itemr">
                <DoughnutChart className="b-iteml" />
              </div>

              {/* <div className="dashboard_bottom_item">
                <Pie className="b-item" />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </DHomePage>
  );
}

export default Dashboard;
