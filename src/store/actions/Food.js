import * as ActionTypes from "./ActionTypes";
import axios from "axios";

export const FetchFoodItemsSuccess = (Items) => ({
  type: ActionTypes.FETCH_FOOD_ITEMS_SUCCESS,
  items: Items,
});

export const FetchFoodItemsFailed = (error) => ({
  type: ActionTypes.FETCH_FOOD_ITEMS_FAILED,
  error: error,
});

export const FetchFoodItemsStart = () => ({
  type: ActionTypes.FETCH_FOOD_ITEMS_START,
});

export const FetchFoodItems = () => {
  return (dispatch) => {
    dispatch(FetchFoodItemsStart());
    axios
      .get("/food/")
      .then((res) => dispatch(FetchFoodItemsSuccess(res.data)))
      .catch((err) => dispatch(FetchFoodItemsFailed(err)));
  };
};
