import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import MDEditor from "@uiw/react-md-editor";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { loadPost } from "../../../redux/actions/post";
import CommentList from "../comment/CommentList";
import EditPostFrom from "./EditPostForm";

const Post = (props) => {
  const dispatch = useDispatch();
  const postId = props.match.params.id;
  const userId = useSelector((state) => state.auth.user.id);
  const post = useSelector((state) => state.post, shallowEqual);
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    dispatch(loadPost(postId));
  }, [postId]);

  return (
    <>
      {post && (
        <Container>
          {post.author.id === userId && (
            <Button onClick={() => setShowEdit(!showEdit)}>
              {showEdit ? "Close" : "Edit"}
            </Button>
          )}
          {showEdit ? (
            <EditPostFrom post={post} />
          ) : (
            <MDEditor.Markdown source={post.content} />
          )}
          <CommentList postId={post.id} />
        </Container>
      )}
    </>
  );
};

export default Post;
