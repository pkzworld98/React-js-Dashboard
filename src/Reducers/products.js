import {
  ADD_PRODUCT,
  ADD_TO_CART,
  FETCH_PRODUCTS,
  HANDLE_AMOUNT_CHANGE,
  REMOVE_ITEM_FROM_CART,
  REMOVE_PRODUCTS,
} from "../Actions/types";

const intitalState = {
  productList: [],
  cartItems: [],
};

const products = (state = intitalState, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return {
        ...state,
        productList: [...state.productList, action.result],
      };

    case REMOVE_PRODUCTS:
      return {
        ...state,
        productList: state.productList.filter(
          (item) => item.id !== action.row.id
        ),
      };

    case FETCH_PRODUCTS:
      return {
        ...state,
        productList: [...action.result],
      };
    case ADD_TO_CART:
      return {
        ...state,
        cartItems: [
          ...state.cartItems.filter(
            (item) => item.item.id !== action.result.item.id
          ),
          { ...action.result },
        ],
      };

    // case UPDATE_CART:
    // return{
    //   ...state,

    // }
    case HANDLE_AMOUNT_CHANGE:
      return {
        ...state,
        cartItems: [
          ...state.cartItems.map((item) =>
            item.item.id === action.value.item.id
              ? action.task === "minus"
                ? {
                    ...item,
                    number: parseInt(item.number) - 1,
                    totalAmount:
                      parseInt(item.totalAmount) - parseInt(item.item.price),
                  }
                : {
                    ...item,
                    number: parseInt(item.number) + 1,
                    totalAmount:
                      parseInt(item.totalAmount) + parseInt(item.item.price),
                  }
              : item
          ),
        ],
      };

    case REMOVE_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: [
          ...state.cartItems.filter(
            (item) => item.item.id !== action.value.item.id
          ),
        ],
      };

    default:
      return state;
  }
};

export default products;
