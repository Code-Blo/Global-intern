import React from "react";
import ReactDOM from "react-dom/client"; // ✅ Use createRoot
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root")); // ✅ Correct way
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
