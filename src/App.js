import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { fetchProductList, intializeUser, fetchUserList } from "./Actions";
import { SET_ADMIN, SET_USER } from "./Actions/types";
import "./App.css";
import AddProducts from "./Containers/Admin/AddProducts";
import Dashboard from "./Containers/Admin/DashBoard";
import UserList from "./Containers/Admin/UserList";
import ViewProducts from "./Containers/Admin/ViewProducts";
import Cart from "./Containers/Cart";

import Home from "./Containers/Home";
import Login from "./Containers/Login";
import Products from "./Containers/Products";
import firebase from "./firebase";
import MuiSnackBar from "./Helper/MuiSnackBar";

function App() {
  const show = useSelector((state) => state.help.snackbar.set);
  console.log(show, "uyei hai shwo");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(intializeUser());
  });
  useEffect(() => {
    dispatch(fetchProductList());
  }, []);

  return (
    <div className="App">
      <Switch>
        <Route path="/products" exact component={Products}></Route>
        <Route path="/addProducts" exact component={AddProducts}></Route>
        <Route path="/userList" exact component={UserList}></Route>
        <Route path="/viewProducts" exact component={ViewProducts}></Route>
        <Route path="/cart" exact component={Cart}></Route>
        <Route path="/dashboard" exact component={Dashboard}></Route>
        <Route path="/" exact component={Home}></Route>
      </Switch>
      {show && <MuiSnackBar />}
    </div>
  );
}

export default App;
