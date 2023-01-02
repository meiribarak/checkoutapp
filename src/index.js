import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { BasketContextProvider } from "./components/store/basket-context";
import { AuthContextProvider } from "./components/store/auth-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <BasketContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </BasketContextProvider>
  </AuthContextProvider>
);
