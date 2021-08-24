import React from "react";
import Layout from "../../Components/Layout";
import DHomePage from "../DHomePage";
import Button from "@material-ui/core/Button";

import { ImFacebook2, ImTwitter } from "react-icons/im";
import { withStyles } from "@material-ui/core/styles";
import { CgGoogle } from "react-icons/cg";
import { green } from "@material-ui/core/colors";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import "./createAdmin.css";
import img from "../../../src/alogo.png";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAdmin } from "../../Actions";

function CreateAdmin() {
  const [email, setEmail] = useState("");
  const [pass, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const dispacth = useDispatch();
  const [lastName, setLastName] = useState("");

  const handler = (e) => {
    e.preventDefault();
    let displayName = firstName + " " + lastName;
    console.log(email, pass, displayName, "yei hai save");
    dispacth(createAdmin({ email, pass, displayName }));
  };
  console.log("aagya ");
  return (
    <DHomePage sidebar>
      <div className="createAdmin">
        <div className="createAdminBox">
          <div className="BoxImage">
            <img src={img} alt="" />
          </div>

          <form className="loginBoxform">
            {/* <div className="apilogin my-4">
                    <Button ><CgGoogle size={25} /></Button>
                    <Button><ImFacebook2 size={25} /></Button>
                    <Button>     <ImTwitter size={25} /></Button>




                </div>
                <div className="or my-2" >
                    <h1>OR</h1>
                </div> */}
            <div class="row">
              <div className="col">
                <label for="firstname" class="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="First Name"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="col">
                <label for="lastname" class="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Last Name"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            <div class="mb-3 my-3">
              <label for="exampleInputEmail1" class="form-label">
                Email address
              </label>
              <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                placeholder="Enter your Email Address"
                aria-describedby="emailHelp"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label  my-1">
                {" "}
                Password
              </label>
              <input
                type="password"
                class="form-control"
                id="exampleInputPassword1"
                onChange={(e) => setPassword(e.target.value)}
                placeholder=" Enter the password"
              />
            </div>

            <button
              type="submit"
              onClick={handler}
              class="btn btn-outline-warning my-4"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </DHomePage>
  );
}

export default CreateAdmin;
