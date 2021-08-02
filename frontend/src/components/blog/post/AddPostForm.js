import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { pushMsg } from "../../../redux/actions/msg";
import { addPost } from "../../../redux/actions/post";
import { CLEAR_POST } from "../../../redux/actions/types";
import PostForm from "./PostForm";

const AddPostFrom = () => {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post, shallowEqual);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    dispatch({ type: CLEAR_POST });
  }, []);

  const onSubmit = (title, content, e) => {
    e.preventDefault();
    if (title && content) {
      dispatch(addPost({ title, content }));
      setAdded(true);
    } else {
      dispatch(pushMsg("info", "Fill empty fields"));
    }
  };

  return added && post.id ? (
    <Redirect to={`/post/${post.id}`} />
  ) : (
    <Container>
      <PostForm onSubmit={onSubmit} buttonText="Add Post" />
    </Container>
  );
};

export default AddPostFrom;
