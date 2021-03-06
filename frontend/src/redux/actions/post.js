import axios from "axios";
import { dispatchErrors, tokenConfig } from "./auth";
import { pushMsg } from "./msg";
import {
  CREATE_POST,
  GET_POST,
  LOADING_FEED,
  LOADING_POST,
  REMOVE_POST,
  UPDATE_POST,
} from "./types";

export const loadPost = (id) => (dispatch) => {
  dispatch({ type: LOADING_POST });

  axios
    .get(`/api/post/${id}`)
    .then((res) => {
      dispatch({
        type: GET_POST,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatchErrors(dispatch, "danger", err.response.data);
    });
};

export const addPost = (post) => (dispatch, getState) => {
  axios
    .post("/api/post/", post, tokenConfig(getState))
    .then((res) => {
      dispatch(pushMsg("success", "Post Added"));
      dispatch({
        type: CREATE_POST,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatchErrors(dispatch, "danger", err.response.data);
    });
};

export const updatePost = (post) => (dispatch, getState) => {
  axios
    .put(`/api/post/${post.id}/`, post, tokenConfig(getState))
    .then((res) => {
      dispatch(pushMsg("success", "Post Updated"));
      dispatch({
        type: UPDATE_POST,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatchErrors(dispatch, "danger", err.response.data);
    });
};

export const removePost = (post) => (dispatch, getState) => {
  dispatch({ type: LOADING_FEED });

  axios
    .delete(`/api/post/${post.id}`, tokenConfig(getState))
    .then((res) => {
      dispatch(pushMsg("success", "Post Updated"));
      dispatch({
        type: REMOVE_POST,
        payload: post,
      });
    })
    .catch((err) => {
      dispatchErrors(dispatch, "danger", err.response.data);
    });
};
