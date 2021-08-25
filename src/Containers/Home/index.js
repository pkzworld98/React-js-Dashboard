import React from "react";
import { useSelector } from "react-redux";
import Layout from "../../Components/Layout";
import DHomePage from "../DHomePage";
import firebase from "../../firebase";

import Login from "../Login";
import "./home.css";
import Dashboard from "../Admin/DashBoard";
import Products from "../Products";

function Home() {
  const user = useSelector((state) => state.user.loggedIn);
  const role = useSelector((state) => state.user.role);
  return (
    <div className="home">
      {user ? role === "user" ? <Products /> : <Dashboard /> : <Login />}
    </div>
  );
}

export default Home;
