import { Button, Tooltip } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { googleApi, signup } from "../../Actions";
import img from "../../../src/logo.jpg";
import { ImFacebook2, ImTwitter } from "react-icons/im";
import { withStyles } from "@material-ui/core/styles";
import { CgGoogle } from "react-icons/cg";
import { green } from "@material-ui/core/colors";
import "./signupbox.css";

function SignUpBox() {
  const [email, setEmail] = useState("");
  const [pass, Setpass] = useState("");
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const error = useSelector((state) => state.error.SignUpError);

  const [adminrole, setAdminrole] = useState(false);

  const dispatch = useDispatch();

  //   console.log(error, "pke");
  //HADNLER OF SUMBIT

  const sumbitHandler = (e) => {
    e.preventDefault();
    const userName = firstName + " " + lastName;
    // console.log(email,pass,userName)
    dispatch(signup({ email, pass, userName }));
  };

  const googleHandler = (e) => {
    e.preventDefault();
    dispatch(googleApi());
  };

  return (
    <div className="signUpBox">
      <div className="loginBoxImage">
        <img src={img} alt="" />
      </div>

      <form className="loginBoxform">
        <div className="apilogin my-4">
          <Tooltip title="Login Using Your Google Account ">
            <Button>
              <CgGoogle
                style={{ fill: "grey" }}
                size={25}
                onClick={googleHandler}
              />
            </Button>
          </Tooltip>
          <Button disableRipple>
            <ImFacebook2 style={{ fill: "grey" }} size={25} />
          </Button>
          <Button disableRipple>
            {" "}
            <ImTwitter style={{ fill: "grey" }} size={25} />
          </Button>
        </div>
        <div className="or my-2">
          <h1>OR</h1>
        </div>
        <div class="row">
          <div class="col">
            <input
              type="text"
              class="form-control"
              placeholder="First name"
              onChange={(e) => setFirstName(e.target.value)}
              aria-label="First name"
            />
          </div>

          <div class="col">
            <input
              type="text"
              class="form-control"
              placeholder="Last name"
              onChange={(e) => setLastName(e.target.value)}
              aria-label="Last name"
            />
          </div>
        </div>
        {/* <div class="mb-3">
          <label class="form-label">User Name</label>
          <input
            type="text"
            class="form-control"
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your Name"
          />
          <label class="form-label">User Name</label>
          <input
            type="text"
            class="form-control"
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your Name"
          />
        </div> */}

        <div class="mb-3 my-3">
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
        ></div>
        {error !== "" ? (
          <div
            class="form-text"
            style={{
              opacity: "0.9",
              fontWeight: "lighter",
              color: "yellow",
              wordWrap: "break-word",
              maxWidth: "500px",

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
          class="btn btn-outline-warning my-5"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default SignUpBox;
