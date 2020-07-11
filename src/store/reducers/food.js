import * as actionTypes from "../actions/ActionTypes";

const intialState = {
  FoodItems: [],
  error: null,
  isLoading: true,
};

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_FOOD_ITEMS_START:
      return { ...state, error: null, isLoading: true };
    case actionTypes.FETCH_FOOD_ITEMS_SUCCESS:
      return { ...state, FoodItems: action.items, isLoading: false };
    case actionTypes.FETCH_FOOD_ITEMS_FAILED:
      return { ...state, error: action.error, isLoading: false };
    default:
      return state;
  }
};

export default reducer;
