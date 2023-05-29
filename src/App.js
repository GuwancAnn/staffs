import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import supabase from "./Components/client";
import AddEmp from "./AddEmp";
import React, { useEffect, useState } from "react";
import Employes from "./Components/Employes";

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
        <Route path="/" element={<SignUp></SignUp>}></Route>
        <Route path="/singin" element={<SignIn settoken={settoken} />}></Route>
        {token ? (
          <Route path="/emps" element={<Employes />}></Route>
        ) : (
          "you can't see page"
        )}
        <Route path="/addemp" element={<AddEmp />}></Route>
      </Routes>
    </div>
  );
};

export default App;
