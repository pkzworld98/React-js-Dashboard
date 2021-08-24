import firebase from "../../firebase";
import cuid from "cuid";
import {
  ADD_PRODUCT,
  FETCH_PRODUCTS,
  REMOVE_PRODUCTS,
  SHOW_MESSAGE,
  STOP_MESSAGE,
} from "../types";

export const addProduct = ({ productId, data, productPictures }) => {
  //   console.log(productPictures);
  return async (dispatch) => {
    dispatch({
      type: SHOW_MESSAGE,
      message: "Wait Please,Product is getting saved",
      emo: "warning",
    });
    const res = await addImageToStorage({ productId, data, productPictures });

    // const rresult= await fetchImageUrl({ productId, data, productPictures });
    console.log(res, "photoUrl");
    const result = { ...data, photoUrl: res };
    const date = new Date();
    console.log(date, "date of creation");

    firebase
      .database()
      .ref("/")
      .child("product")
      .child(data.id)
      .set({
        ...data,
        created_at: firebase.database.ServerValue.TIMESTAMP,
        photoUrl: res,
      })
      .then((r) => {
        dispatch({
          type: ADD_PRODUCT,
          result,
        });

        dispatch({
          type: SHOW_MESSAGE,
          message: "Product Successfully added",
          emo: "success",
        });
      })
      .catch((e) => {
        console.log(e.message);
      });

    // console.log(picture);

    // console.log(data, ...productPictures, "pl");
  };
};

export const addImageToStorage = ({ productId, data, productPictures }) => {
  return new Promise((resolve, reject) => {
    var photoUrl = [];
    var metadata = {
      contentType: "image/jpeg",
    };
    let promiseArray = [];
    for (let pic of productPictures) {
      const uploadTask = firebase
        .storage()
        .ref("/")
        .child(`Product Images/${data.category}`)
        .child(productId)
        .child(pic.name)
        .put(pic, metadata);
      promiseArray.push(uploadTask);
    }

    //   uploadTask.on(
    //     "state_changed",
    //     (snapshot) => {
    //       // Observe state change events such as progress, pause, and resume
    //       // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    //       // var progress =
    //       //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //       // console.log("Upload is " + progress + "% done");
    //       // switch (snapshot.state) {
    //       //   case firebase.storage.TaskState.PAUSED: // or 'paused'
    //       //     console.log("Upload is paused");
    //       //     break;
    //       //   case firebase.storage.TaskState.RUNNING: // or 'running'
    //       //     console.log("Upload is running");
    //       //     break;
    //       // }
    //     },
    //     (error) => {
    //       // Handle unsuccessful uploads
    //     },
    //     () => {
    //       // Handle successful uploads on complete
    //       // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    //       const task = uploadTask.snapshot.ref
    //         .getDownloadURL()
    //         .then((downloadURL) => {
    //           // console.log(downloadURL);
    //           //   photoUrl.push(downloadURL);
    //           // console.log(photoUrl);
    //           //   console.log("File available at", downloadURL);
    //         });

    //     }
    //   );
    // }
    // // console.log(promiseArray, "photo_save");

    Promise.all(promiseArray).then((values) => {
      console.log(values, "promise values");
      let downloadUrlPromises = [];
      values.forEach((item) => {
        const promise = item.ref.getDownloadURL();

        downloadUrlPromises.push(promise);
      });
      console.log(downloadUrlPromises, "download promise");
      Promise.all(downloadUrlPromises).then((result) => {
        console.log("<<<result", result);
        resolve(result);
      });
    });
    // console.log(photoUrl, "photo");
    // resolve(photoUrl);
  });
};
// const fetchImageUrl = ({ productId, data, productPictures }) => {

//   for (let pic of productPictures) {
//     firebase
//       .storage()
//       .ref("/")
//       .child(`Product Images/${data.category}`)
//       .child(productId)
//       .child(pic.name)
//       .getDownloadURL()
//       .then((url) => {
//         // Insert url into an <img> tag to "download"
//         //   console.log(url);
//         photoUrl.push(url);
//       })
//       .catch((error) => {
//         // A full list of error codes is available at
//         // https://firebase.google.com/docs/storage/web/handle-errors
//         console.log(error.message);
//         console.log(error.code);

//         switch (error.code) {
//           case "storage/object-not-found":
//             // File doesn't exist
//             break;
//           case "storage/unauthorized":
//             // User doesn't have permission to access the object
//             break;
//           case "storage/canceled":
//             // User canceled the upload
//             break;

//           // ...

//           case "storage/unknown":
//             // Unknown error occurred, inspect the server response
//             break;
//           default:
//         }
//       });
//   }
//   return photoUrl;
// };

export const getProductListId = () => {
  return new Promise((resolve, reject) => {
    let newArray = [];
    const task = firebase.database().ref("/").child("product").get();
    task.then((value) => {
      console.log(value.val(), "jo snapshot sei mila");
      const storeObject = value.val();
      // console.log(Object.values(storeObject), " store object");
      for (let item in value.val()) {
        newArray.push(item);
      }
      resolve(newArray);
    });
  });
};

export const getProductData = () => {
  return new Promise((resolve, reject) => {
    firebase
      .database()
      .ref("/")
      .child("product")
      .get()
      .then((snapshot) => {
        // console.log(Object.values(snapshot.val()), "pk bhag");
        let result = Object.values(snapshot.val());
        resolve(result);
      });
  });
};
export const fetchProductList = () => {
  return async (dispatch) => {
    // const data = await getProductListId();
    const result = await getProductData();

    // console.log(res);

    console.log("yei aya result product ka ", result);
    dispatch({
      type: FETCH_PRODUCTS,
      result,
    });

    // for (let item of data) {
    //   firebase
    //     .database()
    //     .ref("/")
    //     .child("product")
    //     .child(item)
    //     .get()

    //     .then((snapshot) => {
    //       if (snapshot.exists()) {
    //         // console.log(snapshot.val(), "finalluy mil gya");
    //         const result = snapshot.val();
    //         dispatch({
    //           type: FETCH_PRODUCTS,
    //           result,
    //         });
    //       } else {
    //         console.log("No data available");
    //       }
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    // }
  };
};

export const deleteProduct = (row) => {
  return async (dispatch) => {
    await firebase
      .database()
      .ref("/")
      .child("product")
      .child(row.id)
      .remove()
      .then((r) => {
        dispatch({
          type: REMOVE_PRODUCTS,
          row,
        });

        dispatch({
          type: SHOW_MESSAGE,
          message: "Product Deleted Successfully",
          emo: "error",
        });
      })
      .catch((e) => {});
  };
};

export const stopToast = () => {
  return async (dispatch) => {
    dispatch({
      type: STOP_MESSAGE,
    });
  };
};
