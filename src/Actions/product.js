import {
  ADD_TO_CART,
  HANDLE_AMOUNT_CHANGE,
  REMOVE_ITEM_FROM_CART,
} from "./types";

export const addItem = ({ value, cartItems }) => {
  console.log(cartItems, "cart aya");
  return (dispatch) => {
    var number = 1;
    if (cartItems.length > 0) {
      for (let item of cartItems) {
        // console.log("ghusa yei ,mast");
        // console.log(item, "    ", value.id);
        number = value.id === item.item.id ? parseInt(item.number) + 1 : 1;
        console.log(number, "quantity hai yei");
      }
    }
    var totalAmount = number * parseInt(value.price);
    var item = value;

    const result = {
      item,
      number,
      totalAmount,
    };
    console.log(result);
    dispatch({
      type: ADD_TO_CART,
      result,
    });
  };
};

export const changeAmount = ({ value, task }) => {
  return async (dispatch) => {
    dispatch({
      type: HANDLE_AMOUNT_CHANGE,
      value,
      task,
    });
  };
};

export const removeItemfromCart = (value) => {
  console.log("remove krne bol rhe hai");
  return async (dispacth) => {
    dispacth({
      type: REMOVE_ITEM_FROM_CART,
      value,
    });
  };
};
