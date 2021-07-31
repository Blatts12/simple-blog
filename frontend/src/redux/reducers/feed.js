import { GET_FEED } from "../actions/types";

const initialState = null;

const feedReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FEED:
      return {
        ...action.payload,
        current: action.link,
      };
    default:
      return state;
  }
};

export default feedReducer;
