import React, { useState } from "react";
import DHomePage from "../../DHomePage";
import "./addproduct.css";
import img from "../../../add.png";
import { Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { addImageToStorage, addProduct } from "../../../Actions";
import { useHistory } from "react-router-dom";
import cuid from "cuid";

function AddProducts() {
  const [productName, setProductName] = useState("");
  const [productQuantity, setProductQuantity] = useState(0);
  const [productPrice, setProductPrice] = useState(0);
  const [productDescription, setProductDescription] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productPictures, setProductPicture] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();

  const productPictureHandle = (e) => {
    setProductPicture([...productPictures, e.target.files[0]]);
  };
  const handle = (e) => {
    e.preventDefault();
    // console.log(productPictures, "pk");
    // const productpic = [];
    // for (let pic of productPictures) {
    //   productpic.push(pic);
    // }

    const productId = cuid();
    const data = {
      name: productName,
      description: productDescription,
      quantity: productQuantity,
      price: productPrice,
      category: productCategory,
      id: productId,
    };

    // dispatch(addImageToStorage({ productId, data, productPictures }));
    // const form = new FormData();
    // form.append("name", productName);
    // form.append("description", productDescription);
    // form.append("quantity", productQuantity);
    // form.append("category", productCategory);
    // form.append("price", productPrice);
    // for (let pic of productPictures) {
    //   form.append("photo", pic);
    // }

    dispatch(addProduct({ productId, data, productPictures }));
    history.replace("/viewProducts");
  };
  return (
    <DHomePage sidebar>
      <div className="AddProducts">
        <div className="AddProducts_content">
          <div className="AddProducts_content_header">Add Products</div>
          <div className="AddProducts_content_item">
            <div className="AddProducts_content_form">
              <form>
                <div class="row">
                  <div class="col">
                    <input
                      type="text"
                      class="form-control"
                      onChange={(e) => setProductName(e.target.value)}
                      placeholder="Product name"
                    />
                  </div>
                  <div class="col">
                    <input
                      type="number"
                      class="form-control"
                      onChange={(e) => setProductPrice(e.target.value)}
                      placeholder="Price"
                    />
                  </div>
                </div>
                <div class="row my-4">
                  <div class="col my-5">
                    <input
                      type="text"
                      class="form-control"
                      onChange={(e) => setProductCategory(e.target.value)}
                      placeholder="Category Name"
                    />
                  </div>
                  <div class="col my-3">
                    <label for="formFileMultiple" class="form-label">
                      Photos
                    </label>
                    <input
                      class="form-control"
                      type="file"
                      onChange={productPictureHandle}
                      accept="image/png, image/gif, image/jpeg"
                      // inputProps={{ accept: "*.jpeg" }}
                      id="formFileMultiple"
                      // multiple
                    ></input>

                    <div
                      style={{
                        marginLeft: "15px",
                        marginTop: "10px",
                        color: "rgb(255, 187, 0)",
                      }}
                    >
                      {productPictures.length !== 0
                        ? ` ${productPictures.length} Images selected`
                        : ""}
                    </div>
                  </div>
                </div>
                <div className="row my-3">
                  <div className="col">
                    <input
                      type="text"
                      class="form-control"
                      onChange={(e) => setProductDescription(e.target.value)}
                      placeholder="Product Description"
                    />
                  </div>
                  <div className="col">
                    <input
                      type="number"
                      class="form-control"
                      onChange={(e) => setProductQuantity(e.target.value)}
                      placeholder="Quantity"
                    />
                  </div>
                </div>
                <div
                  id="form_button "
                  className="my-5"
                  style={{ textAlign: "center" }}
                >
                  <Button
                    onClick={handle}
                    style={{
                      background: "rgb(255, 187, 0)",
                      width: "250px",
                    }}
                  >
                    Create
                  </Button>
                </div>
              </form>
            </div>
            <div className="AddProducts_content_img">
              {/* <img src={img} alt="sds" /> */}
            </div>
          </div>
        </div>
      </div>
    </DHomePage>
  );
}

export default AddProducts;
