import "./productmodal.css";
import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import ImageListItemBar from "@material-ui/core/ImageListItemBar";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: "rgba(0, 0, 0,0.01)",
  },
  imageList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
}));

function ProductModal({ product }) {
  const classes = useStyles();
  console.log(product, "agya bro oye");
  return (
    <div className="productModal">
      <div className="productModalcontent">
        <div className="productModalcontentheader">Product Details</div>
        <div className="productModalcontentdetails">
          <div className="productModalcontentdetailsbody">
            <div className="productModalBox">
              <div className="productModalBoxl">
                <div className="productModalBoxtitle">Product Name</div>
                <div className="productModalvalue">{product.name}</div>
              </div>
              <div className="productModalBoxtitler">
                <div className="productModalBoxtitle">Product Price</div>
                <div className="productModalvalue">{product.price}</div>
              </div>
            </div>
            <div className="productModalBox">
              <div className="productModalBoxl">
                <div className="productModalBoxtitle">Product Quantiy</div>
                <div className="productModalvalue">{product.quantity}</div>
              </div>
              <div className="productModalBoxtitler">
                <div className="productModalBoxtitle">Product Category</div>
                <div className="productModalvalue">{product.category}</div>
              </div>
            </div>
            <div className="productModalBox">
              <div className="productModalBoxl">
                <div className="productModalBoxtitle">Product Description</div>
              </div>{" "}
            </div>
            <div
              style={{
                fontWeight: "lighter",
                margin: "0px 42px",
                wordWrap: "break-word",
                textAlign: "justify",
              }}
            >
              {product.description}
            </div>
            {/* <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: "10px 5px",
                margin: " 6px 15px",
                marginLeft: "32px",
              }}
            >
              <div className="productModalBoxtitle">Product Descriptions</div>
              <></>
              <div
                style={{
                  marginTop: " 10px",
                  letterSpacing: " 2px",
                }}
              >
                {product.description}
              </div>{" "}
            </div> */}

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: "10px 5px",
                margin: " 6px 15px",
                marginLeft: "32px",
              }}
            >
              <div
                className="productModalBoxtitle"
                style={{ marginBottom: "15px" }}
              >
                Product Pictures
              </div>
              <></>
              <div
                className={`${classes.root} productModalcontentdetailsimages`}
                style={{
                  marginTop: "4px",
                }}
              >
                <ImageList className={classes.imageList} cols={2.5}>
                  {product.photoUrl.map((item) => (
                    <ImageListItem>
                      <img src={item} alt="j" />
                    </ImageListItem>
                  ))}
                </ImageList>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;
