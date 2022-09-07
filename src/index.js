import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.js";

import Leftbar from "./components/Leftbar";

import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const routes = (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path=":categoryId" element={<Leftbar></Leftbar>} />
      </Route>
    </Routes>
  </BrowserRouter>
);

ReactDOM.render(routes, document.getElementById("root"));

reportWebVitals();
