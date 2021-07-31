import { GET_FEED, LOADING_FEED } from "../actions/types";

const initialState = {
  count: 0,
  next: null,
  previous: null,
  results: [],
  current: null,
  isLoading: false,
};

const feedReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FEED:
      return {
        ...action.payload,
        current: action.link,
        isLoading: false,
      };
    case LOADING_FEED:
      return {
        isLoading: true,
      };
    default:
      return state;
  }
};

export default feedReducer;
