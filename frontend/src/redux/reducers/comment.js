import {
  CREATE_COMMENT,
  GET_COMMENT_FEED,
  REMOVE_COMMENT,
  UPDATE_COMMENT,
} from "../actions/types";

const initialState = [];

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COMMENT_FEED:
      return action.payload;
    case CREATE_COMMENT:
      return [...state, action.payload];
    case REMOVE_COMMENT:
      return state.filter((comment) => comment.id !== action.payload.id);
    case UPDATE_COMMENT:
    default:
      return state;
  }
};

export default commentReducer;
