import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { BasketContextProvider } from "./components/store/basket-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BasketContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </BasketContextProvider>
);


