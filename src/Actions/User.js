import firebase from "../firebase";
import cuid from "cuid";
import {
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

export const signup = ({ userName, email, pass }) => {
  return (dispatch) => {
    // console.log(userName,email,pass,adminrole,"pk")
    console.log(userName, "dekho bhai ", email);

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, pass)
      .then((userCredential) => {
        let displayName = userName;
        const user = { email, displayName };

        dispatch(saveUsertofirebase({ user }));
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

export const login = ({ email, pass, adminrole }) => {
  return async (dispatch) => {
    const role = adminrole ? "admin" : "user";
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, pass)
      .then((userCredential) => {
        // Signed in
        // dispatch({
        //   type: LOGIN_USER,
        //   email,
        //   pass,
        //   role,
        // });
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
        // Handle Errors here.
        // var errorCode = error.code;

        // // The email of the user's account used.
        // var email = error.email;
        // // The firebase.auth.AuthCredential type that was used.
        // var credential = error.credential;

        // ...
      });
  };
};

export const signOut = () => {
  return async (dispatch) => {
    await firebase
      .auth()
      .signOut()
      .then((r) => {
        dispatch({
          type: LOGOUT_USER,
        });
      })
      .catch((e) => {});
  };
};

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

export const intializeUser = () => {
  return async (dispatch) => {
    let admin = await getAdminId();

    // console.log(admin[0], "finaally ", typeof admin);
    await firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // // User is signed in, see docs for a list of available properties
        // // https://firebase.google.com/docs/reference/js/firebase.User

        console.log(user, "user details", admin);
        const displayName = user.displayName;
        const photo = user.photoURL;
        const email = user.email.replace(".", ",");
        let adminOrNot = false;
        admin.forEach((val) => {
          if (val === email) {
            adminOrNot = true;
          }
        });
        // console.log("yei mila", adminOrNot);
        // console.log(String(email) in admin, "true hai admin hai");

        if (adminOrNot) {
          console.log("Admin hai");
          dispatch({
            type: SET_ADMIN,
            displayName,
            photo,
            email,
            role: "admin",
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
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  };
};

const getAdminId = () => {
  return new Promise((resolve, reject) => {
    let admin;
    firebase
      .database()
      .ref("/")
      .child("user")
      .orderByChild("role")
      .equalTo("admin")

      .once("value", function (data) {
        console.log("Start at filter: ", data.val());
        admin = Object.keys(data.val());
        resolve(admin);
      });

    // .then((snapshot) => {
    //   if (snapshot.exists()) {
    //     console.log(snapshot.val(), "abhi wala value");
    //     snapshot.val().forEach((val) => {
    //       console.log(val);
    //     });
    //     let result = snapshot.val().filter;

    //     console.log("Result aaillooo", result);

    // let result = snapshot.val().filter((val) => {

    //   return([
    //     val.role==="admin"?val:

    //   ]

    //   )

    // });
    // console.log(result, "pappu ka answer");
    //   // admin = Object.keys(snapshot.val());
    // } else {
    //   console.log("No data available");
    // }
    // })
    // .catch((error) => {
    //   console.error(error);
    // });

    // task.then((val)=>{

    // })
    return admin;
  });
};

export const saveUsertofirebase = ({ user }) => {
  return async (dispatch) => {
    let adminList = await getAdminId();

    const email = user.email;
    const id = email.replace(".", ",");

    let adminOrNot = false;
    adminList.forEach((val) => {
      if (val === id) {
        adminOrNot = true;
      }
    });

    console.log("I have entered inside the block", adminOrNot);
    if (!adminOrNot) {
      firebase
        .database()
        .ref("/")
        .child("user")
        // .child("normalUser")
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
  };
};

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

export const createAdmin = ({ email, pass, displayName }) => {
  // return async (dispatch) => {
  //   const id = email.replace(".", ",");
  //   firebase
  //     .auth()
  //     .createUserWithEmailAndPassword(email, pass)
  //     .then((userCredential) => {
  //       //  let displayName = userName;
  //       //  const user = { email, displayName };
  //       firebase
  //         .database()
  //         .ref("/")
  //         .child("user")
  //         .child(id)
  //         .set({
  //           email: email,
  //           displayName: displayName,
  //           role: "admin",
  //         })
  //         .then((r) => {
  //           console.log("hopgyaa save data");
  //         })
  //         .catch((e) => {
  //           console.log(e, "error meesssage aagya ");
  //         });
  //     })
  //     .catch((error) => {
  //       // var errorCode = error.code;
  //       var errorMessage = error.message;
  //       dispatch({
  //         type: SIGN_UP_ERROR,
  //         errorMessage,
  //       });
  //       // ..
  //     });
  // };
};

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

// export const makeAdmin = (row) => {
//   return async (dispacth) => {
//     console.log("admin mei change hogaa");

//   };
// };

// export const makeUser = (row) => {
//   console.log("user mei change hogaa");
//   return async (dispacth) => {
//     const id = row.email.replace(".", ",");
//     await firebase
//       .database()
//       .ref("/")
//       .child("user")
//       .child(id)
//       .update({
//         role: "user",
//       })
//       // .onProgress((snapshot) => {
//       //   console.log(snapshot, "progress hai bhai");
//       // })
//       .then((r) => {
//         dispacth({
//           type: SHOW_MESSAGE,
//           message: "Role changed to User",
//           emo: "success",
//         });

//         console.log("user mei change kiye");
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   };
// };
