import React from "react";
import { useSelector } from "react-redux";
import Layout from "../../Components/Layout";
import DHomePage from "../DHomePage";
import firebase from "../../firebase";

import Login from "../Login";
import "./home.css";
import Dashboard from "../Admin/DashBoard";

function Home() {
  const user = useSelector((state) => state.user.loggedIn);
  return <div className="home">{user ? <Dashboard /> : <Login />}</div>;
}

export default Home;
