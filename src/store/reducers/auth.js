import * as actionTypes from "../actions/ActionTypes";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: null,
  user: null,
  profile: null,
  appLoaded: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGIN_START:
    case actionTypes.GET_USER_START:
      return { ...state, isLoading: true };

    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        token: action.token,
        user: action.user,
        profile: action.profile,
      };
    case actionTypes.SET_USER:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.user,
        profile: action.profile,
      };

    case actionTypes.LOGIN_FAILED:
    case actionTypes.GET_USER_FAILED:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
        error: action.error,
      };

    case actionTypes.LOGOUT_START:
      return { ...state, isLoading: true };
    case actionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        token: null,
        user: null,
        profile: null,
      };
    case actionTypes.LOGOUT_FAILED:
      return { ...state, isLoading: false, error: action.error };

    case actionTypes.FIRST_TIME_APP_LOADED:
      return { ...state, appLoaded: true };
    default:
      return state;
  }
}
