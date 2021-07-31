import axios from "axios";
import { dispatchErrors } from "./auth";
import { GET_FEED } from "./types";

export const loadFeed =
  (link = "/api/feed") =>
  (dispatch) => {
    axios
      .get(link)
      .then((res) => {
        dispatch({
          type: GET_FEED,
          payload: res.data,
          link,
        });
      })
      .catch((err) => {
        dispatchErrors(dispatch, "danger", err.response.data);
      });
  };
