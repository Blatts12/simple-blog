import {
  CREATE_COMMENT,
  GET_COMMENT_FEED,
  LOADING_COMMENT,
  REMOVE_COMMENT,
} from "../actions/types";

const initialState = {
  count: 0,
  next: null,
  previous: null,
  results: [],
  isLoading: false,
};

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COMMENT_FEED:
      return {
        ...action.payload,
        isLoading: false,
      };
    case CREATE_COMMENT:
      return {
        ...state,
        results: [action.payload, ...state.results],
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        results: state.results.filter(
          (comment) => comment.id !== action.payload
        ),
      };
    case LOADING_COMMENT:
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
};

export default commentReducer;
