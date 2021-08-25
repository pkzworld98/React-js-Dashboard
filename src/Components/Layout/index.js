import React from "react";
import "./layout.css";

import Sidebar from "../Sidebar";

import AdminSidebar from "../Admin/AdminSidebar";
import { useSelector } from "react-redux";

function Layout(props) {
  const role = useSelector((state) => state.user.role);
  return (
    <div className="layout">
      {props.sidebar ? (
        <div className="layout_main">
          <div className="layout_sidebar">
            {role === "admin" || role === "superadmin" ? (
              <AdminSidebar />
            ) : (
              <Sidebar />
            )}
          </div>

          <div className="layout_body">{props.children}</div>
        </div>
      ) : (
        props.children
      )}
    </div>
  );
}

export default Layout;
