import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.js";

import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

const routes = (
  <BrowserRouter>
    <App></App>
  </BrowserRouter>
);

ReactDOM.render(routes, document.getElementById("root"));

reportWebVitals();
