import React, { useState } from "react";
import { Container, Button, Card, ListGroup } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { loadComments } from "../../../redux/actions/comment";
import PageButtons from "../../common/PageButtons";
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
    <Container className="mt-3 border p-2 rounded">
      {show ? (
        <>
          {isAuthenticated && <CommentForm postId={postId} />}
          {comments?.results?.length > 0 ? (
            <Card>
              <Card.Header>Comments</Card.Header>
              <ListGroup>
                {comments.results.map((comment) => (
                  <Comment comment={comment} key={comment.id} />
                ))}
              </ListGroup>
              <PageButtons
                prevLink={comments.previous}
                currentLink={comments.current}
                nextLink={comments.next}
                loadingFunc={loadComments}
                elementId={postId}
              />
            </Card>
          ) : (
            "Nothing to show"
          )}
        </>
      ) : (
        <Button className="w-100" onClick={showComments}>
          Show comments
        </Button>
      )}
    </Container>
  );
};

export default CommentList;
