import { useState, useContext } from "react";
import { TextField } from "@mui/material";
import { Button, Link } from "@mui/material";
import logo from "../../assets/logo.png";
import * as s from "./styles.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../contexts/AuthContext";

export default function SignIn() {
  const { url } = useContext(AuthContext);
  console.log(url);
  const navigate = useNavigate();
  const [infosInput, setInfosInput] = useState({
    email: "",
    password: "",
  });
  function loginAccount() {
    console.log(infosInput);
    axios({
      method: "POST",
      url: `${url}/signin`,
      data: infosInput,
    })
      .then((response) => {
        console.log(response);
        localStorage.setItem("token", response.data.token);
        navigate("/");
      })
      .catch((error) => {
        // alert(error.response.data)
        console.log(error.response.data);
      });
  }
  return (
    <s.SigninContainer>
      <img src={logo} alt="olhar180" />
      <TextField
        id="outlined-basic"
        label="Email"
        type="email"
        variant="outlined"
        value={infosInput.email}
        onChange={(e) => {
          setInfosInput({ ...infosInput, email: e.target.value });
        }}
      />
      <TextField
        id="outlined-basic"
        label="Password"
        type="password"
        variant="outlined"
        value={infosInput.password}
        onChange={(e) => {
          setInfosInput({ ...infosInput, password: e.target.value });
        }}
      />
      <Button variant="contained" onClick={loginAccount}>
        SIGN IN
      </Button>
      <Link href="/signup" underline="none">
        {"Create a new account!"}
      </Link>
    </s.SigninContainer>
  );
}
