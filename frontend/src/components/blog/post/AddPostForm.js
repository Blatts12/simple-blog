import React from "react";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { pushMsg } from "../../../redux/actions/msg";
import { addPost } from "../../../redux/actions/post";
import PostForm from "./PostForm";

const AddPostFrom = () => {
  const dispatch = useDispatch();

  const onSubmit = (title, content, e) => {
    e.preventDefault();
    if (title && content) {
      dispatch(addPost({ title, content }));
    } else {
      dispatch(pushMsg("info", "Fill empty fields"));
    }
  };

  return (
    <Container>
      <PostForm onSubmit={onSubmit} buttonText="Add Post" />
    </Container>
  );
};

export default AddPostFrom;
