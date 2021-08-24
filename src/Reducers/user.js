import {
  FETCH_USER_LIST,
  LOGIN_USER,
  LOGOUT_USER,
  SET_ADMIN,
  SET_USER,
  UPDATE_ROLE,
} from "../Actions/types";

const initialState = {
  userName: "",
  email: "",

  photo: "",
  role: "",
  loggedIn: false,
  userlist: [],
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,

        userName: action.displayName,
        photo: action.photo,
        email: action.email,
        loggedIn: true,
        role: action.role,
      };

    case LOGOUT_USER:
      return {
        ...state,
        userName: "",
        email: "",

        photo: "",
        role: "",
        loggedIn: false,
        userlist: [],
      };

    // case LOGIN_USER: {
    //   return {
    //     ...state,

    //     //   userName:action.displayName,
    //     //   photo:action.photo,
    //     email: action.email,
    //     loggedIn: true,
    //   };
    // }
    case SET_ADMIN: {
      return {
        ...state,
        userName: action.displayName,
        photo: action.photo,
        email: action.email,
        loggedIn: true,
        role: action.role,
      };
    }
    case UPDATE_ROLE: {
      return {
        ...state,
        userlist: [
          ...state.userlist.map((item) =>
            item.email === action.row.email
              ? { ...item, role: action.userRole }
              : item
          ),
        ],
      };
    }
    case FETCH_USER_LIST: {
      return {
        ...state,
        userlist: [...action.result],
      };
    }

    default:
      return state;
  }
};

export default user;
