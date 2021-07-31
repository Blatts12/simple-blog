import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { loadComments } from "../../../redux/actions/comment";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

const CommentList = ({ postId }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const comments = useSelector((state) => state.comment, shallowEqual);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const showComments = (e) => {
    dispatch(loadComments(postId));
    setShow(true);
  };

  return (
    <Container>
      {show ? (
        <>
          {isAuthenticated && <CommentForm postId={postId} />}
          {comments?.results?.length > 0
            ? comments.results.map((comment) => (
                <Comment
                  authorName={comment.author.username}
                  content={comment.content}
                  creationDate={comment.created_at}
                  key={comment.id}
                />
              ))
            : "Nothing to show"}
        </>
      ) : (
        <Button onClick={showComments}>Show comments</Button>
      )}
    </Container>
  );
};

export default CommentList;
