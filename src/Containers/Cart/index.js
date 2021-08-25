import {
  Button,
  ButtonGroup,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import DHomePage from "../DHomePage";
import "./cart.css";
import { changeAmount, removeItemfromCart } from "../../Actions";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: "100%",
  },
  card: {
    maxWidth: "90%",
    height: "220px",
    // maxHeight: "220px",

    margin: "10px 30px",
    marginTop: "50px",

    background: "rgba(0, 0, 0, 0.5)",
  },
  card2: {
    background: "rgba(0, 0, 0, 0.5)",
    maxWidth: "100%",
    maxHeight: "220px",

    margin: "10px 10px",
    marginTop: "50px",
  },
}));

function Cart() {
  const classes = useStyles();
  const cartList = useSelector((state) => state.products.cartItems);
  const [totalAmount, setTotalAmount] = useState(0);
  const dipsatch = useDispatch();

  let final = 0;
  for (let item of cartList) {
    console.log(item);
    final = final + parseInt(item.totalAmount);
  }
  console.log(final, "final value of cost");
  // setTotalAmount(final);
  const handleAmount = ({ e, value, task }) => {
    if (task === "minus") {
      console.log("ghusa bhadur");
      if (value.number === 1) {
        dipsatch(removeItemfromCart(value));
        return;
      } else {
        dipsatch(changeAmount({ value, task }));
      }
    } else {
      dipsatch(changeAmount({ value, task }));
    }
  };

  return (
    <DHomePage sidebar>
      <div className="cart">
        <div className="products_content_title"> Shopping Cart</div>
        <div className="cartContent">
          <div className={classes.root}>
            <Grid container spacing={3}>
              <Grid item xs={8} className="example">
                {cartList.map((value) => {
                  return (
                    <div className="cart_items my-4">
                      <div className="cart_items_left">
                        <img src={value.item.photoUrl} alt="hellpo"></img>
                      </div>
                      <div className="cart_items_right">
                        <div className="cart_items_name">{value.item.name}</div>
                        <div className="cart_items_price">
                          <div
                            className="totalp"
                            style={{ color: "rgb(197, 146, 5)" }}
                          >
                            Price :
                          </div>
                          <div
                            className="totalAm"
                            style={{ marginLeft: "20px" }}
                          >
                            {value.item.price}
                          </div>
                        </div>
                        <div className="cart_items_totalprice">
                          <div
                            className="totalp"
                            style={{ color: "rgb(197, 146, 5)" }}
                          >
                            Total Price :
                          </div>
                          <div
                            className="totalAm"
                            style={{ marginLeft: "20px" }}
                          >
                            {value.totalAmount}
                          </div>
                        </div>
                        {/* <div className="cart_items_price">
                          {value.item.price}
                        </div> */}
                        <div className="cart_items_button">
                          <ButtonGroup
                            // color="rgb(197, 146, 5)"
                            // variant="contained"
                            aria-label="outlined primary button group"
                          >
                            <Button
                              size="small"
                              style={{ background: "rgb(255, 206, 51)" }}
                              onClick={(e) =>
                                handleAmount({ e, value, task: "minus" })
                              }
                            >
                              <RemoveIcon />
                            </Button>
                            <Button variant="text">{value.number}</Button>
                            <Button
                              size="small"
                              style={{ background: "rgb(255, 206, 51)" }}
                              onClick={(e) =>
                                handleAmount({ e, value, task: "add" })
                              }
                            >
                              <AddIcon />
                            </Button>
                          </ButtonGroup>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </Grid>
              <Grid item xs={4}>
                <Card className={classes.card2}>
                  <CardActionArea>
                    <CardContent>
                      <Typography
                        style={{
                          display: "flex",
                          alignItems: "center",
                          color: "rgb(197, 146, 5)",
                        }}
                        gutterBottom
                        variant="h5"
                        component="h2"
                      >
                        Total Items in the cart :{" "}
                        <div
                          className="cart_item_number"
                          style={{ color: "white", marginLeft: "10px" }}
                        >
                          {cartList.length}
                        </div>
                      </Typography>
                      <Typography
                        style={{
                          display: "flex",
                          alignItems: "center",
                          color: "rgb(197, 146, 5)",
                        }}
                        className="my-4"
                        variant="body1"
                        // varriant="h4"

                        // color="rgb(197, 146, 5)"
                      >
                        Total Amount :
                        <div
                          className="totalAmount"
                          style={{
                            // border: "3px solid green",
                            marginLeft: "10px",
                            color: "white",
                          }}
                        >
                          {final}
                        </div>
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  {/* <CardActions>
                    <Button size="small" color="primary">
                      Share
                    </Button>
                    <Button size="small" color="primary">
                      Learn More
                    </Button>
                  </CardActions> */}
                </Card>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </DHomePage>
  );
}

export default Cart;
