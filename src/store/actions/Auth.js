import axios from "axios";
import * as actionTypes from "./ActionTypes";
import { FetchOrders } from "../actions/Order";
import { FetchCartItems, UpdateCart, ClearCart } from "./Cart";
export const FirstTimeAppLoaded = () => ({
  type: actionTypes.FIRST_TIME_APP_LOADED,
});

export const LoginStart = () => {
  return { type: actionTypes.LOGIN_START };
};

export const LoginSuccess = (user, profile, token) => {
  localStorage.setItem("token", token);
  axios.defaults.headers["Authorization"] = `Token ${token}`;

  return {
    type: actionTypes.LOGIN_SUCCESS,
    user: user,
    profile: profile,
    token: token,
  };
};

export const LoginFailed = (error) => ({
  type: actionTypes.LOGIN_FAILED,
  error: error,
});

export const Login = (data) => {
  return (dispatch) => {
    dispatch(LoginStart());
    axios
      .post("/auth/login", data)
      .then((res) => {
        dispatch(LoginSuccess(res.data.user, res.data.profile, res.data.token));
        dispatch(UpdateCart());
        dispatch(FetchOrders());
      })
      .catch((err) => {
        dispatch(LoginFailed(err.response.data));
        console.log(err.response.data);
      });
  };
};

//LOGOUT

export const LogoutStart = () => {
  return { type: actionTypes.LOGOUT_START };
};

export const LogoutSuccess = () => {
  delete axios.defaults.headers["Authorization"];
  // console.log(axios.defaults.headers);
  localStorage.removeItem("token");
  return {
    type: actionTypes.LOGOUT_SUCCESS,
  };
};

export const LogoutFailed = (error) => ({
  type: actionTypes.LOGOUT_FAILED,
  error: error,
});

export const Logout = (data) => {
  return (dispatch, getState) => {
    dispatch(LogoutStart());
    axios
      .post("/auth/logout/", data)
      .then((res) => {
        dispatch(LogoutSuccess());
        dispatch(ClearCart());
      })
      .catch((err) => {
        dispatch(LogoutFailed(err.response.data));
      });
  };
};

//GET USER

export const GetUserStart = () => {
  return { type: actionTypes.GET_USER_START };
};

export const SetUser = (user, profile) => ({
  type: actionTypes.SET_USER,
  user: user,
  profile: profile,
});

export const GetUserFailed = (error) => ({
  type: actionTypes.GET_USER_FAILED,
  error: error,
});

export const GetUser = () => {
  return (dispatch, getState) => {
    let token = getState().auth.token;
    if (token) {
      dispatch(GetUserStart());
      axios.defaults.headers["Authorization"] = `Token ${token}`;
      axios
        .get("/auth/user")
        .then((res) => {
          dispatch(SetUser(res.data.user, res.data.profile));
          dispatch(FetchCartItems());
          dispatch(FetchOrders());
          dispatch(FirstTimeAppLoaded());
        })
        .catch((err) => {
          dispatch(GetUserFailed(err.response.data));
          dispatch(FirstTimeAppLoaded());
        });
    } else dispatch(FirstTimeAppLoaded());
  };
};
