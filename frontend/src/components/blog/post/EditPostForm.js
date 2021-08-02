import React from "react";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { pushMsg } from "../../../redux/actions/msg";
import { updatePost } from "../../../redux/actions/post";
import PostForm from "./PostForm";

const EditPostFrom = ({ post, onEdit }) => {
  const dispatch = useDispatch();

  const onSubmit = (title, content, e) => {
    e.preventDefault();
    if (title && content) {
      dispatch(updatePost({ ...post, title, content }));
      onEdit();
    } else {
      dispatch(pushMsg("info", "Fill empty fields"));
    }
  };

  return (
    <Container>
      <PostForm
        onSubmit={onSubmit}
        postContent={post.content}
        postTitle={post.title}
        buttonText="Edit Post"
      />
    </Container>
  );
};

export default EditPostFrom;
