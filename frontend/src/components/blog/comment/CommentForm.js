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
      dispatch(addComment({ post: postId, content }));
      setContent("");
    } else {
      dispatch(pushMsg("info", "Fill empty fields"));
    }
  };

  return (
    <Form onSubmit={onSubmit} className="mb-3">
      <Form.Group>
        <Form.Control
          as="textarea"
          maxLength="256"
          name="content"
          onChange={onChange}
          value={content}
        />
      </Form.Group>
      <div className="d-flex justify-content-between mb-2">
        <Form.Label>Comment{` [${content.length}/256]`}</Form.Label>
        <Button type="submit">Add Comment</Button>
      </div>
    </Form>
  );
};

export default CommentForm;
