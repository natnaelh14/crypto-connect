import thunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { postListReducer, postListByFollowingReducer } from "./reducers/postReducers";
import { currentUserReducer } from "./reducers/userReducers";


const reducer = combineReducers({
  postList: postListReducer,
  currentUser: currentUserReducer,
  postListByFollowing: postListByFollowingReducer
});

const initialState = {};

export const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch