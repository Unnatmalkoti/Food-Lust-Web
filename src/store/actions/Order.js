import * as actionTypes from "./ActionTypes";
import axios from "axios";

export const ResetPlacedSuccessfully = () => ({
  type: actionTypes.RESET_PLACED_SUCCESSFULLY,
});

export const FetchOrdersSuccess = (orders) => ({
  type: actionTypes.FETCH_ORDERS_SUCCESS,
  orders,
});

export const FetchOrdersFailed = (error) => ({
  type: actionTypes.FETCH_ORDERS_FAILED,
  error,
});

export const FetchOrdersStart = () => ({
  type: actionTypes.FETCH_ORDERS_START,
});

export const FetchOrders = () => (dispatch) => {
  dispatch(FetchOrdersStart());
  axios
    .get("my-orders")
    .then((res) => dispatch(FetchOrdersSuccess(res.data)))
    .catch((err) => dispatch(FetchOrdersFailed(err)));
};

export const PlaceOrderSuccess = (order) => ({
  type: actionTypes.PLACE_ORDER_SUCCESS,
  order,
});

export const PlaceOrderFailed = (error) => ({
  type: actionTypes.PLACE_ORDER_FAILED,
  error,
});

export const PlaceOrderStart = () => ({
  type: actionTypes.PLACE_ORDER_START,
});

export const PlaceOrder = (data) => (dispatch) => {
  dispatch(PlaceOrderStart());
  console.log(data);
  axios
    .post("my-orders", data)
    .then((res) => {
      dispatch(PlaceOrderSuccess(res.data));
      // dispatch(FetchOrders());
      console.log(res);
    })
    .catch((err) => dispatch(PlaceOrderFailed(err)));
};
