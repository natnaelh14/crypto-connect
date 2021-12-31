import {
  POST_LIST_FAIL,
  POST_LIST_FOLLOWING_FAIL,
  POST_LIST_FOLLOWING_REQUEST,
  POST_LIST_FOLLOWING_SUCCESS,
  POST_LIST_REQUEST,
  POST_LIST_SUCCESS,
} from "../constants/postConstants";

export const postListReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case POST_LIST_REQUEST:
      return { loading: true, posts: [] };
    case POST_LIST_SUCCESS:
      return {
        loading: false,
        posts: action.payload,
      };
    case POST_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const postListByFollowingReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case POST_LIST_FOLLOWING_REQUEST:
      return { loading: true, posts: [] };
    case POST_LIST_FOLLOWING_SUCCESS:
      return {
        loading: false,
        posts: action.payload,
      };
    case POST_LIST_FOLLOWING_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
