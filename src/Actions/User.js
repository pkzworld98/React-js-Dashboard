import firebase from "../firebase";
import cuid from "cuid";
import {
  CLEAR_CART,
  FETCH_USER_LIST,
  LOGIN_ERROR,
  LOGIN_REQUEST,
  LOGIN_USER,
  LOGOUT_USER,
  REMOVE_ERROR,
  SET_ADMIN,
  SET_USER,
  SHOW_MESSAGE,
  SIGN_UP_ERROR,
  SIGN_UP_REQUEST,
  UPDATE_ROLE,
} from "./types";

//////MANAGING SIGNUP

export const signup = ({ userName, email, pass }) => {
  return (dispatch) => {
    console.log(userName, "dekho bhai ", email);

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, pass)
      .then((userCredential) => {
        let displayName = userName;
        const user = { email, displayName };
        console.log(user, "yei hai user");

        dispatch(saveUser({ user }));
      })
      .catch((error) => {
        // var errorCode = error.code;
        var errorMessage = error.message;

        dispatch({
          type: SIGN_UP_ERROR,
          errorMessage,
        });
        // ..
      });
  };
};

////MANAGING LOGIN

export const login = ({ email, pass, adminrole }) => {
  return async (dispatch) => {
    const role = adminrole ? "admin" : "user";
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, pass)
      .then((userCredential) => {
        dispatch({
          type: REMOVE_ERROR,
        });
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;

        dispatch({
          type: LOGIN_ERROR,
          errorMessage,
        });
      });
  };
};

////MANAGING GOOGLE LOGIN

export const googleApi = () => {
  return async (dispatch) => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        dispatch(saveUsertofirebase({ user }));
        // console.log(result.user.email, "user ki jankari");
        // ...
        dispatch({
          type: REMOVE_ERROR,
        });
      })
      .catch((error) => {
        var errorMessage = error.message;
        dispatch({
          type: SIGN_UP_ERROR,
          errorMessage,
        });
      });
  };
};

////MANAGING SIGNOUT

export const signOut = () => {
  return async (dispatch) => {
    await firebase
      .auth()
      .signOut()
      .then((r) => {
        dispatch({
          type: LOGOUT_USER,
        });
        dispatch({
          type: CLEAR_CART,
        });
      })
      .catch((e) => {});
  };
};

////////MANAGING REQUEST

export const signUpRequest = () => {
  return async (dispatch) => {
    dispatch({
      type: SIGN_UP_REQUEST,
    });
  };
};

export const loginRequest = () => {
  return async (dispatch) => {
    dispatch({
      type: LOGIN_REQUEST,
    });
  };
};

////INTIALIZE USER

export const intializeUser = () => {
  return async (dispatch) => {
    await firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const displayName = user.displayName;
        const photo = user.photoURL;
        const email = user.email.replace(".", ",");
        firebase
          .database()
          .ref("/")
          .child("user")
          .child(email)
          .child("role")
          .get()
          .then((r) => {
            var role = r.val();
            if (role === "admin" || role === "superadmin") {
              console.log("Admin hai");
              dispatch({
                type: SET_ADMIN,
                displayName,
                photo,
                email,
                role: role,
              });
            } else {
              console.log("User hai");
              dispatch({
                type: SET_USER,
                displayName,
                photo,
                email,
                role: "user",
              });
            }
          })
          .catch((e) => {});
      } else {
        // User is signed out
        // ...
      }
    });
  };
};

////SAVE USER TO FIREBASE WHEN USED SIGN UP BOX

const saveUser = ({ user }) => {
  return async (dispatch) => {
    const email = user.email;
    const id = email.replace(".", ",");
    await firebase
      .database()
      .ref("/")
      .child("user")
      .child(id)
      .set({
        email: user.email,
        displayName: user.displayName,

        role: "user",
      })
      .then((r) => {
        console.log("hopgyaa save data");
      })
      .catch((e) => {
        console.log(e, "error meesssage aagya ");
      });
  };
};

/// SAVE USER TO FIREBASE WHEN GOOGLE LOGIN IS USED

export const saveUsertofirebase = ({ user }) => {
  return async (dispatch) => {
    const email = user.email;
    const id = email.replace(".", ",");
    var role;

    const result = await firebase
      .database()
      .ref("/")
      .child("user")
      .child(id)
      .child("role")
      .get()

      .then((r) => {
        role = r.val();
        if (role === "user") {
          // console.log("ghus to rha hai sonali");
          firebase
            .database()
            .ref("/")
            .child("user")
            .child(id)
            .set({
              email: user.email,
              displayName: user.displayName,

              role: "user",
            })
            .then((r) => {
              console.log("hopgyaa save data");
            })
            .catch((e) => {
              console.log(e, "error meesssage aagya ");
            });
        }
      });
  };
};

////FETCHING USER LIST

export const fetchUserList = () => {
  return async (dispatch) => {
    firebase
      .database()
      .ref("/")
      .child("user")
      .get()
      .then((snapshot) => {
        let result = Object.values(snapshot.val());

        result = result.filter((item) => item.role !== "superadmin");

        dispatch({
          type: FETCH_USER_LIST,
          result,
        });
      });
  };
};

////CHANGING THE ROLE FROM USER TO ADMIN OR ADMIN TO USER

export const changeRole = (row) => {
  return async (dispacth) => {
    const userRole = row.role === "admin" ? "user" : "admin";
    const id = row.email.replace(".", ",");
    console.log(row, "yei aya row mera");
    await firebase
      .database()
      .ref("/")
      .child("user")
      .child(id)
      .update({
        role: userRole,
      })
      .then((r) => {
        dispacth({
          type: SHOW_MESSAGE,
          message: `Role changed to ${
            userRole === "admin" ? "Changed to Admin" : "Changed to User"
          }`,
          emo: "success",
        });

        dispacth({
          type: UPDATE_ROLE,
          row,
          userRole,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };
};
