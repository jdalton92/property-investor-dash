import React from "react";
import ReactGA from "react-ga";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store";

if (process.env.NODE_ENV === "production") {
  ReactGA.initialize("UA-158975814-1");
  ReactGA.pageview(window.location.pathname + window.location.search);
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
