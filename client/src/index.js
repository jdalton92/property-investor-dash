import React from "react";
import ReactGA from "react-ga";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App2 from "./App2";
import store from "./store";

if (process.env.NODE_ENV === "production") {
  ReactGA.initialize("UA-158975814-1");
  ReactGA.pageview(window.location.pathname + window.location.search);
}

ReactDOM.render(
  <Provider store={store}>
    <App2 />
  </Provider>,
  document.getElementById("root")
);
