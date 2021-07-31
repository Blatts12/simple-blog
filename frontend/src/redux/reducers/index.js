import { combineReducers } from "redux";
import authReducer from "./auth";
import commentReducer from "./comment";
import feedReducer from "./feed";
import msgReducer from "./msg";
import postReducer from "./post";

const rootReducer = combineReducers({
  auth: authReducer,
  feed: feedReducer,
  message: msgReducer,
  post: postReducer,
  comment: commentReducer,
});

export default rootReducer;
