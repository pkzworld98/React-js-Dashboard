import {
  ADD_TO_CART,
  HANDLE_AMOUNT_CHANGE,
  REMOVE_ITEM_FROM_CART,
} from "./types";

///ADD ITEM TO CART

export const addItem = ({ value, cartItems }) => {
  return (dispatch) => {
    var number = 1;
    if (cartItems.length > 0) {
      for (let item of cartItems) {
        number = value.id === item.item.id ? parseInt(item.number) + 1 : 1;
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

///ADD PRODUCT QUANTITY

export const changeAmount = ({ value, task }) => {
  return async (dispatch) => {
    dispatch({
      type: HANDLE_AMOUNT_CHANGE,
      value,
      task,
    });
  };
};

////REMOVE ITEM FROM CART

export const removeItemfromCart = (value) => {
  return async (dispacth) => {
    dispacth({
      type: REMOVE_ITEM_FROM_CART,
      value,
    });
  };
};
