import React, { useState } from "react";
import Layout from "../../Components/Layout";
import "./homepage.css";
import Avatar from "@material-ui/core/Avatar";
import { IconButton, makeStyles, Menu, MenuItem } from "@material-ui/core";
import ContainerMenu from "../../Helper/ContainerMenu";
import { useDispatch, useSelector } from "react-redux";
import { ActivateMenu } from "../../Actions/helper";
import ShoppingCartTwoToneIcon from "@material-ui/icons/ShoppingCartTwoTone";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

function DHomePage(props) {
  const user = useSelector((state) => state.user);
  const cartList = useSelector((state) => state.products.cartItems).length;

  const dispatch = useDispatch();
  //  const [anchorEl, setAnchorEl] = React.useState(null);
  const [event, setEvent] = useState("");

  //       const handleClick = (e) => {
  //     // setAnchorEl(event.currentTarget);
  // //    var val=anchorEl
  // console.log(e.currentTarget)
  // setEvent(e.currentTarget)
  // dispatch(ActivateMenu(event))

  //   };
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  // if(event!==null){
  //   setAnchorEl(event);

  // }

  // event!==null?setAnchorEl(event.currentTarget):setAnchorEl(null)

  const handleClose = () => {
    setAnchorEl(null);
  };
  const classes = useStyles();

  //   const handleClose = () => {
  //     setAnchorEl(null);
  //   };

  // const classes = useStyles();

  return (
    <div className="dhomepage">
      <div className="dhomecontainer">
        <div className="dhomepage_header">
          <div className="domehomepage_header_content"></div>

          <div
            className={
              user.role === "user"
                ? "dhomepage_header_button"
                : "dhomepage_header_button_admin"
            }
            style={{}}
          >
            {user.role === "user" ? (
              <NavLink to="cart">
                <div className="numberOfItems_cart">{cartList}</div>
                <IconButton>
                  <ShoppingCartTwoToneIcon
                    style={{ fontSize: "larger", fill: "rgb(197, 146, 5)" }}
                  />
                </IconButton>
              </NavLink>
            ) : (
              ""
            )}

            <Avatar
              className={classes.large}
              id="avatar"
              src={user.photo}
              onClick={handleClick}
            />

            <ContainerMenu anchorEl={anchorEl} handleClose={handleClose} />
          </div>
        </div>
        <div className="dhomepage_content">
          {props.sidebar ? (
            <Layout sidebar>{props.children}</Layout>
          ) : (
            <Layout>{props.children}</Layout>
          )}
        </div>
      </div>
    </div>
  );
}

export default DHomePage;
