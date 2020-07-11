import * as ActionTypes from "../actions/ActionTypes";

const intialState = {
  cartItems: [],
  isLoading: false,
  isUpdating: false,
  error: null,
  unUpdatedCartItems: [],
};

const reducer = (state = intialState, action) => {
  let newCartItems;
  switch (action.type) {
    case ActionTypes.ADD_TO_CART_START:
      newCartItems = updateCartItems(action.item, state.cartItems);
      return { ...state, cartItems: newCartItems, isUpdating: true };

    case ActionTypes.ADD_TO_CART_SUCCESS:
      return {
        ...state,
        isUpdating: false,
        cartItems: updateCartItems(action.item, state.cartItems),
        unUpdatedCartItems: removeCartItems(action.item, state.cartItems),
      };

    case ActionTypes.ADD_TO_CART_FAILED:
      newCartItems = updateCartItems(
        action.item,
        state.unUpdatedCartItems,
        true
      );
      return {
        ...state,
        unUpdatedCartItems: newCartItems,
        error: action.error,
        isUpdating: false,
      };

    case ActionTypes.REMOVE_FROM_CART:
      newCartItems = state.cartItems.filter((item) => item.id !== action.id);
      return { ...state, cartItems: newCartItems };

    case ActionTypes.FETCH_CART_ITEMS_START:
      console.log("loading");
      return { ...state, error: null, isLoading: true };

    case ActionTypes.FETCH_CART_ITEMS_SUCCESS:
      console.log("loaded");
      return { ...state, cartItems: action.items, isLoading: false };
    case ActionTypes.FETCH_CART_ITEMS_FAILED:
      return { ...state, error: action.error, isLoading: false };

    case ActionTypes.CLEAR_CART:
      return { ...state, cartItems: [], unUpdatedCartItems: [] };

    default:
      return state;
  }
};

const updateCartItems = (item, cartItems, allowZeroQuantity = false) => {
  let newCartItems = cartItems.filter(
    (cartItem) => cartItem.item !== item.item
  );
  if (item.quantity || allowZeroQuantity) newCartItems.push(item);
  return newCartItems;
};

const removeCartItems = (item, cartItems) => {
  let newCartItems = cartItems.filter(
    (cartItem) => cartItem.item !== item.item
  );
  return newCartItems;
};

export default reducer;
