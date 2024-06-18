import React from "react";
import ReactDOM from "react-dom/client";
import "../src/styles/index.css";
import Home from "./pages/home";
import Router from "./routes/router";
import { Toaster } from "./components/ui/toaster";
import { TokenProvider } from "./utils/context/tokenContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TokenProvider>
      <Router />
      <Toaster />
    </TokenProvider>
  </React.StrictMode>
);
