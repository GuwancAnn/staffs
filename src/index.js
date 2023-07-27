import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.js";

import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

const routes = (
  <StrictMode>
    <BrowserRouter>
      <App></App>
    </BrowserRouter>
  </StrictMode>
);

ReactDOM.render(routes, document.getElementById("root"));

reportWebVitals();
