import * as ActionTypes from "./ActionTypes";
import axios from "axios";

export const AddToCartStart = (item) => {
  return { type: ActionTypes.ADD_TO_CART_START, item };
};

export const AddToCartFailed = (err, item) => {
  return { type: ActionTypes.ADD_TO_CART_FAILED, error: err, item };
};

export const AddToCartSuccess = (item) => {
  return { type: ActionTypes.ADD_TO_CART_SUCCESS, item: item };
};

export const AddToCart = (item) => {
  return (dispatch) => {
    dispatch(AddToCartStart(item));
    axios
      .post("/cart-items/", item)
      .then((res) => dispatch(AddToCartSuccess(res.data)))
      .catch((err) => dispatch(AddToCartFailed(err.response, item)));
  };
};

export const UpdateCart = () => {
  return (dispatch, getState) => {
    const { cart } = getState();
    const unUpdatedCartItems = cart.unUpdatedCartItems;
    // console.log(auth);
    unUpdatedCartItems.forEach((cartItem) => {
      axios
        .post("/cart-items/", cartItem)
        .then((res) => {
          dispatch(AddToCartSuccess(res.data));
        })
        .catch((err) => dispatch(AddToCartFailed(err.response, cartItem)));
    });
    dispatch(FetchCartItems());
  };
};

export const ClearCart = () => ({ type: ActionTypes.CLEAR_CART });

export const RemoveFromCart = (id) => {
  return { type: ActionTypes.REMOVE_FROM_CART, id: id };
};

export const FetchCartItemsSuccess = (Items) => ({
  type: ActionTypes.FETCH_CART_ITEMS_SUCCESS,
  items: Items,
});

export const FetchCartItemsFailed = (error) => ({
  type: ActionTypes.FETCH_CART_ITEMS_FAILED,
  error: error,
});

export const FetchCartItemsStart = () => ({
  type: ActionTypes.FETCH_CART_ITEMS_START,
});

export const FetchCartItems = () => {
  return (dispatch) => {
    dispatch(FetchCartItemsStart());
    axios
      .get("/cart-items/")
      .then((res) => dispatch(FetchCartItemsSuccess(res.data)))
      .catch((err) => dispatch(FetchCartItemsFailed(err.response.data.detail)));
  };
};
