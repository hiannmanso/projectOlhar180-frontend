import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthContext from "./contexts/AuthContext";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";

export default function App() {
  const [token, setToken] = useState("");
  const [url, setUrl] = useState(`${import.meta.env.VITE_API_URL}`);
  return (
    <>
      <BrowserRouter>
        <AuthContext.Provider value={{ token, setToken, url }}>
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </AuthContext.Provider>
      </BrowserRouter>
    </>
  );
}
