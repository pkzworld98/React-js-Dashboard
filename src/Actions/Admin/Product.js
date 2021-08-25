import firebase from "../../firebase";
import cuid from "cuid";
import {
  ADD_PRODUCT,
  FETCH_PRODUCTS,
  REMOVE_PRODUCTS,
  SHOW_MESSAGE,
  STOP_MESSAGE,
} from "../types";

//ADD PRODUCTS

export const addProduct = ({ productId, data, productPictures }) => {
  return async (dispatch) => {
    dispatch({
      type: SHOW_MESSAGE,
      message: "Wait Please,Product is getting saved",
      emo: "warning",
    });
    const res = await addImageToStorage({ productId, data, productPictures });

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
  };
};

////ADD IMAGE TO STORAGE

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
  });
};

///GET PRODUCT LIST ID

export const getProductListId = () => {
  return new Promise((resolve, reject) => {
    let newArray = [];
    const task = firebase.database().ref("/").child("product").get();
    task.then((value) => {
      console.log(value.val(), "jo snapshot sei mila");
      const storeObject = value.val();

      for (let item in value.val()) {
        newArray.push(item);
      }
      resolve(newArray);
    });
  });
};

////GET PRODUCT DATA

export const getProductData = () => {
  return new Promise((resolve, reject) => {
    firebase
      .database()
      .ref("/")
      .child("product")

      .limitToLast(10)
      .get()
      .then((snapshot) => {
        console.log(
          Object.values(snapshot.val()),
          "result received by firebase"
        );
        let result = Object.values(snapshot.val());
        resolve(result);
      });
  });
};

///FETCH PRODUCT LIST

export const fetchProductList = () => {
  return async (dispatch) => {
    const result = await getProductData();

    console.log("yei aya result product ka ", result);
    dispatch({
      type: FETCH_PRODUCTS,
      result,
    });
  };
};

/////DELETE PRODUCT

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

///STOP TOAST

export const stopToast = () => {
  return async (dispatch) => {
    dispatch({
      type: STOP_MESSAGE,
    });
  };
};
