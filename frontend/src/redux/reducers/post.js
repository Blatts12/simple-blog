import {
  CREATE_POST,
  GET_POST,
  REMOVE_POST,
  UPDATE_POST,
} from "../actions/types";

const initialState = null;

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POST:
    case CREATE_POST:
    case UPDATE_POST:
      return action.payload;
    case REMOVE_POST:
      return initialState;
    default:
      return state;
  }
};

export default postReducer;
