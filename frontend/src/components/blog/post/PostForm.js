import MDEditor from "@uiw/react-md-editor";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const PostForm = ({
  onSubmit,
  postContent = "",
  postTitle = "",
  buttonText = "",
}) => {
  const [title, setTitle] = useState(postTitle);
  const [content, setContent] = useState(postContent);

  const nameToSetState = {
    title: setTitle,
  };

  const onChange = (e) => nameToSetState[e.target.name](e.target.value);

  return (
    <Form onSubmit={(e) => onSubmit(title, content, e)}>
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter title"
          name="title"
          onChange={onChange}
          value={title}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Content{` [${content.length}/2048]`}</Form.Label>
        <MDEditor value={content} onChange={setContent} />
      </Form.Group>
      <Button className="mt-3" variant="primary" type="submit">
        {buttonText}
      </Button>
    </Form>
  );
};

export default PostForm;
