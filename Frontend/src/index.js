import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./Context/cartContext";
import { UserProvider } from "./Context/userContext";
import { CookiesProvider } from "react-cookie";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <CookiesProvider>
      <React.StrictMode>
        <UserProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </UserProvider>
      </React.StrictMode>
    </CookiesProvider>
  </BrowserRouter>
);
