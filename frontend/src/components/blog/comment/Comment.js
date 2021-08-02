import React from "react";
import { ListGroup } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { removeComment } from "../../../redux/actions/comment";

const Comment = ({ comment }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user, shallowEqual);

  const canRemove = () => {
    return (
      user?.id === comment.author.id ||
      user?.is_staff ||
      user?.groups.some((g) => g.name === "Blogger")
    );
  };

  return (
    <ListGroup.Item>
      <div
        className={`d-flex justify-content-between mb-${canRemove() ? 1 : 2}`}
      >
        <div>
          <strong>{comment.author.username}</strong>{" "}
          <small className="text-muted">
            Commented on{" "}
            {new Intl.DateTimeFormat("en-GB", {
              year: "numeric",
              month: "long",
              day: "2-digit",
            }).format(new Date(comment.created_at))}
          </small>
        </div>
        {canRemove() && (
          <button
            className="p-0 m-0 bg-transparent border-0 text-secondary fs-5"
            onClick={() => dispatch(removeComment(comment))}
          >
            <BsTrash />
          </button>
        )}
      </div>

      <span>{comment.content}</span>
    </ListGroup.Item>
  );
};

export default Comment;
