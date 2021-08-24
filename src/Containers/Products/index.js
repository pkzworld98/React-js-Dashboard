import React from "react";
import "./products.css";
import DHomePage from "../DHomePage";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Button, IconButton, Paper, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import AddShoppingCartTwoToneIcon from "@material-ui/icons/AddShoppingCartTwoTone";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../Actions";

const useStylesCard = makeStyles({
  root: {
    maxWidth: 345,
    width: 300,
    background: "rgba(0, 0, 0, 0.5)",
    marginTop: "40px",
  },
  media: {
    height: 250,
    objectFit: "contain",
  },
});
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

function Products() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.products.cartItems);

  const addItemtoCart = ({ e, value }) => {
    e.preventDefault();
    console.log(e);

    console.log("hello", value);
    dispatch(addItem({ value, cartItems }));
  };
  const classes = useStyles();
  const cardclasses = useStylesCard();

  const productList = useSelector((state) => state.products.productList);

  return (
    <DHomePage sidebar>
      <div className="products">
        <div className="products_content_title">Products</div>
        <div className="products_content">
          <div className="product_content_body ">
            <Grid container className={classes.root} spacing={1}>
              <Grid item xs={12}>
                <Grid container justifyContent="center" spacing={8}>
                  {productList.map((value) => (
                    <Grid key={value.id} item>
                      <Card className={cardclasses.root}>
                        {/* <CardActionArea> */}
                        <CardMedia
                          className={cardclasses.media}
                          image={value.photoUrl[0]}

                          // title="Contemplative Reptile"
                        />
                        <CardContent>
                          <div className="cardcontent">
                            <div className="cardcontent_top">{value.name}</div>
                            <div className="cardcontent_bottom ">
                              <div className="product_price">{value.price}</div>

                              <CardActions>
                                <IconButton
                                  onClick={(e) => {
                                    addItemtoCart({ e, value });
                                  }}
                                >
                                  <AddShoppingCartTwoToneIcon
                                    style={{
                                      fontSize: "larger",

                                      fill: "rgb(197, 146, 5)",
                                    }}
                                  />
                                </IconButton>
                              </CardActions>
                            </div>
                          </div>
                        </CardContent>
                        {/* </CardActionArea> */}
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </DHomePage>
  );
}

export default Products;
