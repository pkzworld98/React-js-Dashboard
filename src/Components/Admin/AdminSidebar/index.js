import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import LocalMallOutlinedIcon from "@material-ui/icons/LocalMallOutlined";
import "./admin_sidebar.css";
import { ListItemText, Typography } from "@material-ui/core";
import DashboardTwoToneIcon from "@material-ui/icons/DashboardTwoTone";
import ShoppingCartTwoToneIcon from "@material-ui/icons/ShoppingCartTwoTone";
import PeopleAltTwoToneIcon from "@material-ui/icons/PeopleAltTwoTone";
import PersonAddTwoToneIcon from "@material-ui/icons/PersonAddTwoTone";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";

import ShoppingBasketTwoToneIcon from "@material-ui/icons/ShoppingBasketTwoTone";
import { NavLink } from "react-router-dom";

function AdminSidebar() {
  return (
    <div className="admin_sidebar">
      <div className="admin_sidebar_top"></div>

      <div className="admin_sidebar_body">
        <NavLink className="text-link" to="dashboard">
          <ListItem button clasName="my-2">
            <ListItemIcon>
              <DashboardTwoToneIcon style={{ fill: "rgb(197, 146, 5)" }} />
            </ListItemIcon>
            <ListItemText
              disableTypography
              primary={
                <Typography type="body2" style={{}}>
                  Dash Board
                </Typography>
              }
            />
          </ListItem>
        </NavLink>
        <NavLink className="text-link" to="userList">
          <ListItem button clasName="my-2">
            <ListItemIcon>
              <PeopleAltTwoToneIcon style={{ fill: "rgb(197, 146, 5)" }} />
            </ListItemIcon>
            <ListItemText
              disableTypography
              primary={
                <Typography type="body2" style={{}}>
                  Users
                </Typography>
              }
            />
          </ListItem>
        </NavLink>

        <NavLink className="text-link" to="addProducts">
          <ListItem button clasName="my-2">
            <ListItemIcon>
              <AddShoppingCartIcon style={{ fill: "rgb(197, 146, 5)" }} />
            </ListItemIcon>
            <ListItemText
              disableTypography
              primary={
                <Typography type="body2" style={{}}>
                  Add Products
                </Typography>
              }
            />
          </ListItem>
        </NavLink>
        <NavLink className="text-link" to="viewProducts">
          <ListItem button clasName="my-2">
            <ListItemIcon>
              <ShoppingBasketTwoToneIcon style={{ fill: "rgb(197, 146, 5)" }} />
            </ListItemIcon>
            <ListItemText
              disableTypography
              primary={
                <Typography type="body2" style={{}}>
                  View Products
                </Typography>
              }
            />
          </ListItem>
        </NavLink>

        {/* <ListItem button clasName="my-2">
          <ListItemIcon>
            <ShoppingCartTwoToneIcon style={{ fill: "rgb(197, 146, 5)" }} />
          </ListItemIcon>
          <ListItemText
            disableTypography
            primary={
              <Typography type="body2" style={{}}>
                Orders
              </Typography>
            }
          />
        </ListItem> */}
        {/* <NavLink className="text-link" to="createAdmin">
          <ListItem button clasName="my-2">
            <ListItemIcon>
              <PersonAddTwoToneIcon style={{ fill: "rgb(197, 146, 5)" }} />
            </ListItemIcon>
            <ListItemText
              disableTypography
              primary={
                <Typography type="body2" style={{}}>
                  Create Admin
                </Typography>
              }
            />
          </ListItem>
        </NavLink> */}
      </div>
    </div>
  );
}

export default AdminSidebar;
