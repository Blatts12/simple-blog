import {
  CREATE_POST,
  GET_POST,
  LOADING_POST,
  REMOVE_POST,
  UPDATE_POST,
} from "../actions/types";

const initialState = {
  id: null,
  author: null,
  title: null,
  content: null,
  created_at: null,
  modified_at: null,
  isLoading: false,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POST:
    case CREATE_POST:
    case UPDATE_POST:
      return {
        ...action.payload,
        isLoading: false,
      };
    case REMOVE_POST:
      return initialState;
    case LOADING_POST:
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
};

export default postReducer;
