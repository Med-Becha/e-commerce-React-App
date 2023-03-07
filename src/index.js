import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "swiper/css/bundle";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
