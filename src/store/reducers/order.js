import * as actionTypes from "../actions/ActionTypes";

const intialState = {
  orders: [],
  isLoading: false,
  error: null,
  placingOrder: false,
  placedSuccessfully: false,
  payment: {},
};

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ORDERS_START:
      return { ...state, isLoading: true, error: null };
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return { ...state, isLoading: false, orders: action.orders };
    case actionTypes.FETCH_ORDERS_FAILED:
      return { ...state, isLoading: false, error: action.error };

    case actionTypes.RESET_PLACED_SUCCESSFULLY:
      return { ...state, placedSuccessfully: false };

    case actionTypes.PLACE_ORDER_START:
      return {
        ...state,
        placingOrder: true,
        error: null,
        placedSuccessfully: null,
      };
    case actionTypes.PLACE_ORDER_SUCCESS:
      let orders = [...state.orders];
      orders.push(action.order);
      return {
        ...state,
        placingOrder: false,
        orders: orders,
        placedSuccessfully: action.order,
      };
    case actionTypes.PLACE_ORDER_FAILED:
      return {
        ...state,
        placingOrder: false,
        error: action.error,
        placedSuccessfully: false,
      };

    default:
      return state;
  }
};

export default reducer;
