import {
  POST_LIST_FAIL,
  POST_LIST_FOLLOWING_FAIL,
  POST_LIST_FOLLOWING_REQUEST,
  POST_LIST_FOLLOWING_SUCCESS,
  POST_LIST_REQUEST,
  POST_LIST_SUCCESS,
} from "../constants/postConstants";

export const listPosts = (data) => async (dispatch) => {
  try {
    dispatch({ type: POST_LIST_REQUEST });

    dispatch({
      type: POST_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: POST_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listPostsByFollowing = (data) => async (dispatch) => {
  try {
    dispatch({ type: POST_LIST_FOLLOWING_REQUEST });

    dispatch({
      type: POST_LIST_FOLLOWING_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: POST_LIST_FOLLOWING_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
