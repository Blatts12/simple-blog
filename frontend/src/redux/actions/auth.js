import axios from "axios";
import { pushMsg } from "./msg";
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "./types";

export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING });

  if (!getState().auth.token) {
    dispatch({ type: AUTH_ERROR });
  } else {
    axios
      .get("/api/auth/user", tokenConfig(getState))
      .then((res) => {
        dispatch({
          type: USER_LOADED,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatchErrors(dispatch, "danger", err.response.data);
        dispatch({ type: AUTH_ERROR });
      });
  }
};

export const login = (username, password) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ username, password });

  axios
    .post("/api/auth/login", body, config)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatchErrors(dispatch, "danger", err.response.data);
      dispatch({ type: LOGIN_FAIL });
    });
};

export const logout = () => (dispatch, getState) => {
  axios
    .post("/api/auth/logout", null, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: LOGOUT_SUCCESS,
      });
    })
    .catch((err) => {
      dispatchErrors(dispatch, "danger", err.response.data);
    });
};

export const register =
  ({ username, email, password }) =>
  (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ username, email, password });

    axios
      .post("/api/auth/register", body, config)
      .then((res) => {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatchErrors(dispatch, "danger", err.response.data);
        dispatch({ type: REGISTER_FAIL });
      });
  };

export const tokenConfig = (getState) => {
  const token = getState().auth.token;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  return config;
};

export const dispatchErrors = (dispatch, type, errorData) => {
  for (const [key, value] of Object.entries(errorData)) {
    if (Array.isArray(value)) {
      for (const innerValue of value) {
        if (innerValue != value)
          dispatch(pushMsg(type, `${key}: ${innerValue}`));
        else dispatch(pushMsg(type, innerValue));
      }
    } else {
      dispatch(pushMsg(type, value));
    }
  }
};
