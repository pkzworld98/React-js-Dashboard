import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import LocalMallTwoToneIcon from "@material-ui/icons/LocalMallTwoTone";
import ListItemText from "@material-ui/core/ListItemText";

import "./sidebar.css";
import { NavLink } from "react-router-dom";

function Sidebar() {
  // const loggedIn=
  return (
    <div className="sidebar">
      <div className="sidebar_top"></div>

      <div className="sidebar_body">
        <NavLink className="text-link" to="/products">
          <ListItem button clasName="">
            <ListItemIcon>
              <LocalMallTwoToneIcon style={{ fill: "rgb(197, 146, 5)" }} />
            </ListItemIcon>
            <ListItemText primary="Products" />
          </ListItem>
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
