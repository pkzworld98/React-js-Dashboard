import { LOGIN_ERROR, REMOVE_ERROR, SIGN_UP_ERROR } from "../Actions/types";

const intialState = {
  SignUpError: "",
  LoginError: "",
};

const error = (state = intialState, action) => {
  switch (action.type) {
    case SIGN_UP_ERROR:
      return {
        ...state,
        SignUpError: action.errorMessage,
      };

    case LOGIN_ERROR:
      return {
        ...state,
        LoginError: action.errorMessage,
      };
    case REMOVE_ERROR:
      return {
        ...state,
        SignUpError: "",
        LoginError: "",
      };

    default:
      return state;
  }
};

export default error;
