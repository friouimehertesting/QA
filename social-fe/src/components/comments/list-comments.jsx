import React from "react";
import CommentItem from "./list-item";

import "./style.scss";

function ListComments({ comments, id, handleEditComment, isEdit }) {
  return (
    <div>
      {comments?.sort().map((comment) => (
        <CommentItem
          key={comment?._id}
          comment={comment}
          id={id}
          handleEditComment={handleEditComment}
          isEdit={isEdit}
        />
      ))}
    </div>
  );
}

export default ListComments;
