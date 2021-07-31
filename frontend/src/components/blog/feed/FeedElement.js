import React from "react";
import { Card } from "react-bootstrap";
import MDEditor from "@uiw/react-md-editor";
import { Link } from "react-router-dom";

const FeedElement = ({ post }) => {
  return (
    <Card className="mb-3 mt-3">
      <Card.Body>
        <Card.Title>
          <Link to={`/post/${post.id}`}>{post.title}</Link>
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {post.author.username}
        </Card.Subtitle>
        <div className="card-text">
          <MDEditor.Markdown source={post.content.substring(0, 120)} />
        </div>
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
  );
};

export default FeedElement;
