import {
  USER_INFO_REQUEST,
  USER_INFO_SUCCESS,
  USER_INFO_FAIL,
} from "../constants/userConstants";

export const currentUserReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_INFO_REQUEST:
      return { loading: true, user: {} };
    case USER_INFO_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case USER_INFO_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
