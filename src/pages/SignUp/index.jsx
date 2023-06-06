import { useContext, useState } from "react";
import { TextField } from "@mui/material";
import { Button, Link } from "@mui/material";
import logo from "../../assets/logo.png";
import * as s from "./styles.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "../../contexts/AuthContext";
export default function SignUp() {
  const { url } = useContext(AuthContext);
  const navigate = useNavigate();
  const [infosInput, setInfosInput] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  async function loginAccount() {
    console.log(infosInput);
    axios({
      method: "post",
      url: `${url}/signup`,
      data: infosInput,
    })
      .then((response) => {
        toast.success("Created Account!");
        navigate("/signin");

        console.log(response);
      })
      .catch((error) => {
        if (
          error.response.data[0].split(" ")[0].replace(/"|'/g, "") ===
          "password"
        ) {
          alert("Password need to have numbers.");
        } else {
          alert(error.response.data);

          console.log(error.response.data);
        }
      });
  }

  return (
    <s.SignUpContainer>
      <ToastContainer />
      <img src={logo} alt="olhar180" />
      <TextField
        id="outlined-basic"
        label="Name"
        type="text"
        variant="outlined"
        value={infosInput.username}
        onChange={(e) => {
          setInfosInput({
            ...infosInput,
            username: e.target.value,
          });
        }}
      />
      <TextField
        id="outlined-basic"
        label="Email"
        type="email"
        variant="outlined"
        value={infosInput.email}
        onChange={(e) => {
          setInfosInput({
            ...infosInput,
            email: e.target.value,
          });
        }}
      />
      <TextField
        id="outlined-basic"
        label="Password"
        type="password"
        variant="outlined"
        value={infosInput.password}
        onChange={(e) => {
          setInfosInput({
            ...infosInput,
            password: e.target.value,
          });
        }}
      />
      <TextField
        id="outlined-basic"
        label="Confirm Password"
        type="password"
        variant="outlined"
        value={infosInput.confirmPassword}
        onChange={(e) => {
          setInfosInput({
            ...infosInput,
            confirmPassword: e.target.value,
          });
        }}
      />
      <Button variant="contained" onClick={loginAccount}>
        SIGN UP
      </Button>
      <Link href="/signin" underline="none">
        {"Sign in on your account!"}
      </Link>
    </s.SignUpContainer>
  );
}
