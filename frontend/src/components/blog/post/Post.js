import React, { useEffect, useState } from "react";
import { Container, Button, Card } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import MDEditor from "@uiw/react-md-editor";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { loadPost, removePost } from "../../../redux/actions/post";
import CommentList from "../comment/CommentList";
import EditPostFrom from "./EditPostForm";
import { Redirect } from "react-router-dom";

const Post = (props) => {
  const dispatch = useDispatch();
  const postId = props.match.params.id;
  const auth = useSelector((state) => state.auth, shallowEqual);
  const post = useSelector((state) => state.post, shallowEqual);
  const [showEdit, setShowEdit] = useState(false);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    dispatch(loadPost(postId));
  }, [postId]);

  const canEdit = () => {
    return auth.user?.id === post.author?.id || auth.user?.is_staff;
  };

  const onEdit = () => {
    setShowEdit(false);
  };

  const onRemove = () => {
    dispatch(removePost(post));
    setRedirect(true);
  };

  return redirect ? (
    <Redirect to="/" />
  ) : (
    <>
      {post && (
        <Container>
          {canEdit() && (
            <div className="d-flex justify-content-between mt-2">
              <Button onClick={() => setShowEdit(!showEdit)}>
                {showEdit ? "Close" : "Edit"}
              </Button>
              <button
                className="p-0 m-0 bg-transparent border-0 text-secondary fs-5"
                onClick={onRemove}
              >
                <BsTrash />
              </button>
            </div>
          )}
          {showEdit ? (
            <EditPostFrom post={post} onEdit={onEdit} />
          ) : (
            <Card className="mt-2">
              <Card.Body>
                <Card.Title className="fs-1">{post.title}</Card.Title>
                <Card.Subtitle className="fs-4 text-secondary pb-2 mb-3 border-bottom border-2">
                  {post.author?.username}
                </Card.Subtitle>
                <MDEditor.Markdown
                  source={post.content}
                  className="card-text"
                />
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">
                  Posted on{" "}
                  {new Intl.DateTimeFormat("en-GB", {
                    year: "numeric",
                    month: "long",
                    day: "2-digit",
                  }).format(new Date(post.created_at))}
                </small>
              </Card.Footer>
            </Card>
          )}
          <CommentList postId={post.id} />
        </Container>
      )}
    </>
  );
};

export default Post;
