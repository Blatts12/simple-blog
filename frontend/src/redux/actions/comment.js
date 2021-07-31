import axios from "axios";
import { dispatchErrors, tokenConfig } from "./auth";
import { pushMsg } from "./msg";
import { CREATE_COMMENT, GET_COMMENT_FEED, REMOVE_COMMENT } from "./types";

export const loadComments =
  (postId, link = null) =>
  (dispatch) => {
    if (!link) link = `/api/post/${postId}/comments`;
    axios
      .get(link)
      .then((res) => {
        dispatch({
          type: GET_COMMENT_FEED,
          payload: res.data,
          link,
        });
      })
      .catch((err) => {
        dispatchErrors(dispatch, "danger", err.response.data);
      });
  };

export const addComment =
  ({ postId, content }) =>
  (dispatch, getState) => {
    axios
      .post("/api/comment/", { post: postId, content }, tokenConfig(getState))
      .then((res) => {
        dispatch(pushMsg("success", "Comment Added"));
        dispatch({
          type: CREATE_COMMENT,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatchErrors(dispatch, "error", err.response.data);
      });
  };

export const removeComment = (commentId) => (dispatch, getState) => {
  axios
    .delete(`/api/comment/${commentId}/`, tokenConfig(getState))
    .then((res) => {
      dispatch(pushMsg("success", "Comment Removed"));
      dispatch({
        type: REMOVE_COMMENT,
        payload: commentId,
      });
    })
    .catch((err) => {
      dispatchErrors(dispatch, "error", err.response.data);
    });
};
