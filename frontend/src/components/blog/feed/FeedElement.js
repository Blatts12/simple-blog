import React from "react";
import { Card } from "react-bootstrap";
import MDEditor from "@uiw/react-md-editor";
import { Link } from "react-router-dom";

const FeedElement = ({ post }) => {
  return (
    <Card className="mb-3 mt-3">
      <Card.Body>
        <Card.Title className="border-bottom">
          <div className="d-flex justify-content-between mb-2 text-wrap">
            <Link
              className="fs-3 text-break"
              style={{
                textDecoration: "none",
                color: "black",
              }}
              to={`/post/${post.id}`}
            >
              {post.title}
            </Link>
            <span className="fs-4 text-secondary">{post.author.username}</span>
          </div>
        </Card.Title>
        <div className="card-text">
          <MDEditor.Markdown source={post.content.substring(0, 120)} />
        </div>
      </Card.Body>
      <Card.Footer className="d-flex">
        <div className="w-100">
          <small className="text-muted">
            Posted on{" "}
            {new Intl.DateTimeFormat("en-GB", {
              year: "numeric",
              month: "long",
              day: "2-digit",
            }).format(new Date(post.created_at))}
          </small>
        </div>
        <div className="flex-shrink-1">
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={`/post/${post.id}`}
          >
            Open
          </Link>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default FeedElement;
