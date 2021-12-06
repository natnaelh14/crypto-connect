import {
  USER_INFO_REQUEST,
  USER_INFO_SUCCESS,
  USER_INFO_FAIL
} from "../constants/userConstants";

export const setCurrentUser = (user) => async(dispatch) => {
  try {
      dispatch({ type: USER_INFO_REQUEST });
  dispatch({
    type: USER_INFO_SUCCESS,
    payload: user,
  });
  } catch (error) {
    dispatch({
      type: USER_INFO_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }


};
