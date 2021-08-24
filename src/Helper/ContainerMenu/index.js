import {
  Avatar,
  Button,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Menu,
  MenuItem,
  withStyles,
} from "@material-ui/core";
import React from "react";
// import { useHistory } from "react-route";
import { useDispatch, useSelector } from "react-redux";
import "./containermenu.css";
import HomeTwoToneIcon from "@material-ui/icons/HomeTwoTone";
import SettingsTwoToneIcon from "@material-ui/icons/SettingsTwoTone";
import PersonOutlineTwoToneIcon from "@material-ui/icons/PersonOutlineTwoTone";
import { signOut } from "../../Actions";
import { NavLink, useHistory } from "react-router-dom";

const StyledMenu = withStyles({
  paper: {
    // border: '1px solid black',
    width: "170px",
    background: "rgba(126, 126, 126, 0.9)",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.text.disabled,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.action.active,
      },
    },
  },
}))(MenuItem);

function ContainerMenu({ anchorEl, handleClose }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const LogoutHandler = (e) => {
    e.preventDefault();
    dispatch(signOut());
    // window.history.replaceState(null, "New Page Title", "/");
    // history.push("/");
    history.replace("/");
    // window.location.reload();
  };

  const user = useSelector((state) => state.user);

  //  const event= useSelector(state=>state.menu.event)

  // setAnchorEl(event);

  return (
    <div className="containermenu">
      {/* <Avatar className={classes.large} id="avatar" src={user.photo}  onClick={handleClick}/> */}
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem>
          <div className="menu_head">
            <div className="menu_head_name">{user.userName}</div>
            <div className="menu_head_email">{user.email}</div>
          </div>{" "}
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            <HomeTwoToneIcon style={{ fill: "rgb(197, 146, 5)" }} />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            <PersonOutlineTwoToneIcon style={{ fill: "rgb(197, 146, 5)" }} />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            <SettingsTwoToneIcon style={{ fill: "rgb(197, 146, 5)" }} />
          </ListItemIcon>
          <ListItemText primary="Setting" />
        </StyledMenuItem>
        <div
          className="logout_butt my-3"
          style={{ alignItems: "center", textAlign: "center" }}
        >
          <Button
            onClick={LogoutHandler}
            style={{
              background: "rgb(213, 141, 7)",
              textDecoration: "none",
              textTransform: "none",
            }}
          >
            Logout
          </Button>

          {/* <button class="btn btn-outline-warning" type="submit">Logout</button> */}
        </div>
      </StyledMenu>
    </div>
  );
}

export default ContainerMenu;
