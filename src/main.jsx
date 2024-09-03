import React from "react";
import ReactDOM from "react-dom/client";
import "../src/styles/index.css";
import Home from "./pages/home";
import Router from "./routes/router";
import { Toaster } from "./components/ui/toaster";
import { TokenProvider } from "./utils/context/tokenContext";
import { Provider } from "react-redux";
import { store } from "./utils/store/indexConfigCart";
import ReactGA from "react-ga4";

ReactGA.initialize("G-YXNC46JBGR");

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <TokenProvider>
      <Router />
      <Toaster />
    </TokenProvider>
  </Provider>
);
