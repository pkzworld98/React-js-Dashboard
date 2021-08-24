import React, { useState } from "react";
import "./loginbox.css";
import img from "../../../src/logo.jpg";
import { useSelector, useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";

import { ImFacebook2, ImTwitter } from "react-icons/im";
import { withStyles } from "@material-ui/core/styles";
import { CgGoogle } from "react-icons/cg";
import { green } from "@material-ui/core/colors";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import { googleApi, login, signup } from "../../Actions";
import Tooltip from "@material-ui/core/Tooltip";
import store from "../../Store";

function LoginBox() {
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedF: true,
    checkedG: true,
  });

  const [email, setEmail] = useState("");
  const [pass, Setpass] = useState("");
  const error = useSelector((state) => state.error.LoginError);

  const [adminrole, setAdminrole] = useState(false);

  const dispatch = useDispatch();

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    if (event.target.checked) {
      setAdminrole(true);
    } else {
      setAdminrole(false);
    }
  };
  console.log(adminrole);

  console.log(error, "pke");
  //HADNLER OF SUMBIT

  const sumbitHandler = (e) => {
    e.preventDefault();
    // console.log(email,pass,userName)
    dispatch(login({ email, pass, adminrole }));
  };

  const googleHandler = (e) => {
    e.preventDefault();
    dispatch(googleApi());
  };

  const GreenCheckbox = withStyles({
    root: {
      color: green[400],
      "&$checked": {
        color: green[600],
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);

  return (
    <div className="loginBox">
      <div className="loginBoxImage">
        <img src={img} alt="" />
      </div>

      <form className="loginBoxform">
        <div className="apilogin my-4">
          <Tooltip title="Login Using Your Google Account ">
            <Button>
              <CgGoogle size={25} onClick={googleHandler} />
            </Button>
          </Tooltip>
          <Button>
            <ImFacebook2 disableRipple style={{ fill: "grey" }} size={25} />
          </Button>
          <Button>
            {" "}
            <ImTwitter disableRipple style={{ fill: "grey" }} size={25} />
          </Button>
        </div>
        <div className="or my-2">
          <h1>OR</h1>
        </div>
        {/* <div class="mb-3">
                    <label  class="form-label">User Name</label>
                    <input type="text" class="form-control" onChange={(e)=>setUserName(e.target.value)} placeholder="Enter your unique User Id"/> */}
        {/*                   
                </div> */}
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Email address
          </label>
          <input
            type="email"
            class={error ? "form-control is-invalid" : "form-control"}
            id="exampleInputEmail1"
            value={email}
            placeholder="Enter your Email Address"
            onChange={(e) => setEmail(e.target.value)}
            aria-describedby="emailHelp"
          />
          <div
            id="emailHelp"
            class="form-text"
            style={{ fontWeight: "lighter", opacity: "0.9", color: "wheat" }}
          >
            We'll never share your email with anyone else.
          </div>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label  my-1">
            {" "}
            Password
          </label>
          <input
            type="password"
            class={error ? "form-control is-invalid" : "form-control"}
            id="exampleInputPassword1"
            onChange={(e) => Setpass(e.target.value)}
            placeholder=" Enter the password"
          />
        </div>
        <div
          class="mb-3 form-check"
          style={{ display: "flex", alignItems: "center", padding: "0px" }}
        >
          <FormControlLabel
            control={
              <GreenCheckbox
                checked={state.checkedG}
                onChange={handleChange}
                name="checkedG"
              />
            }
            label="Are you Admin ?"
          />
        </div>
        {error !== "" ? (
          <div
            class="form-text"
            style={{
              opacity: "0.9",
              fontWeight: "lighter",
              color: "yellow",
              wordWrap: "break-word",
              maxWidth: "300px",

              height: "18px",
              marginBottom: "3px",
            }}
          >
            {error}
          </div>
        ) : (
          <div
            class="form-text"
            style={{
              opacity: "0.9",
              fontWeight: "lighter",
              color: "rgb(145, 42, 42)",
              letterSpacing: "1px",
              marginBottom: "6px",

              height: "18px",
            }}
          ></div>
        )}

        <button
          type="submit"
          onClick={sumbitHandler}
          class="btn btn-outline-warning my-4"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default LoginBox;
