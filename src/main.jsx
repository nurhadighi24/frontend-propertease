import React from "react";
import ReactDOM from "react-dom/client";
import "../src/styles/index.css";
import Home from "./pages/home";
import Router from "./routes/router";
import { Toaster } from "./components/ui/toaster";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router />
    <Toaster />
  </React.StrictMode>
);
