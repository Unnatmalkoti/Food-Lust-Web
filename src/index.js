import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import FoodReducer from "./store/reducers/food";
import CartReducer from "./store/reducers/cart";
import UserReducer from "./store/reducers/user";
import OrderReducer from "./store/reducers/order";
import AuthReducer from "./store/reducers/auth";

import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import axios from "axios";
import { LogoutSuccess } from "./store/actions/Auth";
import thunk from "redux-thunk";

axios.defaults.baseURL = "http://localhost:8000/api";
axios.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response.status === 401 && store.getState().auth.token)
      store.dispatch(LogoutSuccess());
    return Promise.reject(error);
  }
);

const reducers = combineReducers({
  food: FoodReducer,
  cart: CartReducer,
  user: UserReducer,
  orders: OrderReducer,
  auth: AuthReducer,
});

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
