import { CREATE_MSG, REMOVE_MSG } from "../actions/types";

const initialState = [];

const msgReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_MSG:
      return [...state, action.payload];
    case REMOVE_MSG:
      return state.filter((msg) => msg.id !== action.payload);
    default:
      return state;
  }
};

export default msgReducer;
