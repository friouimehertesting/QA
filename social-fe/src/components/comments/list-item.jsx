import moment from "moment";
import { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import DEFAULT from "../../images/default.jpeg";
import makeRequest from "../../axios/axios";
import { AuthContext } from "../../context/auth-context";

function CommentItem({ comment, id, handleEditComment }) {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data) => {
      return makeRequest.patch(
        `/api/v1/posts/${data?.postId}/comment/${data?.commentId}/delete`
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  const handleDeleteComment = (commentObject) => {
    const data = {
      postId: id,
      commentId: commentObject?._id,
    };
    mutation.mutate(data);
  };

  console.log("Comment", comment);
  return (
    <div className="comments">
      <div
        className={
          user?.data?._id === comment?.commentId?._id ? "item active" : "item"
        }
      >
        <div className="user-info">
          <img
            src={
              comment?.commentId?.picture?.includes("default")
                ? DEFAULT
                : comment?.commentId?.picture
            }
            alt=""
          />
          <span className="commented-by">{comment?.commentId?.pseudo}</span>
          <span className="time-commented">
            {moment.utc(comment?.timestamp).format("HH:mm")}
          </span>
        </div>
        <div className="comment-details">
          <div className="item">{comment?.text}</div>
          {user?.data?._id === comment?.commentId?._id && (
            <div className="action">
              <span
                className="mdi mdi-delete delete"
                onClick={() => handleDeleteComment(comment)}
              ></span>
              <span
                className="mdi mdi-update edit"
                onClick={() => handleEditComment(comment?.text, comment?._id)}
              ></span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CommentItem;
