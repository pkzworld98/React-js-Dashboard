import {
  LOGIN_REQUEST,
  SHOW_MESSAGE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESSFUL,
  STOP_MESSAGE,
} from "../Actions/types";

const intialState = {
  signUp: false,
  snackbar: {
    message: "",
    type: "",
    set: false,
  },
};

const help = (state = intialState, action) => {
  switch (action.type) {
    case SIGN_UP_REQUEST:
      return {
        ...state,
        signUp: true,
      };

    case SIGN_UP_SUCCESSFUL:
      return {
        ...state,
        signUp: false,
      };
    case LOGIN_REQUEST:
      return {
        ...state,
        signUp: false,
      };

    case SHOW_MESSAGE:
      return {
        ...state,
        snackbar: {
          ...state.snackbar,
          message: action.message,
          type: action.emo,
          set: true,
        },
      };
    case STOP_MESSAGE:
      return {
        ...state,
        snackbar: intialState.snackbar,
      };

    default:
      return state;
  }
};
export default help;
