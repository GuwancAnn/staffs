import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import AddEmp from "./AddEmp";
import React, { useEffect, useState } from "react";
import Employes from "./Components/Employes";
import Static from "./Components/Static";

const App = () => {
  const [token, settoken] = useState(false);
  if (token) {
    sessionStorage.setItem("token", JSON.stringify(token));
  }

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      let data = JSON.parse(sessionStorage.getItem("token"));
      settoken(data);
    }
  }, []);

  return (
    <div>
      <Routes>
        {" "}
        <Route path="/" element={<SignUp settoken={settoken}></SignUp>}></Route>
        <Route path="/singin" element={<SignIn settoken={settoken} />}></Route>
        {token ? (
          <Route path="/emps" element={<Employes />}></Route>
        ) : (
          "you can't see page"
        )}
        <Route path="/addemp" element={<AddEmp />}></Route>
        <Route path="/st" element={<Static />}></Route>
      </Routes>
    </div>
  );
};

export default App;
