import { combineReducers } from "redux";
import user from "./user";
import error from "./error";
import menu from "./menu";
import help from "./help";
import products from "./products";

const rootReducer = combineReducers({
  user,
  error,

  menu,
  help,
  products,
});

export default rootReducer;
