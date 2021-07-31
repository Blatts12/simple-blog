import React from "react";

const Comment = ({ authorName, content, creationDate }) => {
  return (
    <div>
      <p>{authorName}</p>
      <p>
        Commented on{" "}
        {new Intl.DateTimeFormat("en-GB", {
          year: "numeric",
          month: "long",
          day: "2-digit",
        }).format(new Date(creationDate))}
      </p>
      <p>{content}</p>
    </div>
  );
};

export default Comment;
