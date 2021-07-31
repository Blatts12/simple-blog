import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addComment } from "../../../redux/actions/comment";
import { pushMsg } from "../../../redux/actions/msg";

const CommentForm = ({ postId }) => {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");

  const nameToSetState = {
    content: setContent,
  };

  const onChange = (e) => nameToSetState[e.target.name](e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();
    if (content) {
      dispatch(addComment({ postId, content }));
    } else {
      dispatch(pushMsg("info", "Fill empty fields"));
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group>
        <Form.Label>Comment{` [${content.length}/256]`}</Form.Label>
        <Form.Control
          as="textarea"
          maxLength="256"
          name="content"
          onChange={onChange}
          value={content}
        />
      </Form.Group>
      <Button type="submit">Add Comment</Button>
    </Form>
  );
};

export default CommentForm;
