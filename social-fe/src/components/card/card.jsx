import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import makeRequest from "../../axios/axios";
import { AuthContext } from "../../context/auth-context";
import ListComments from "../comments";
import Avatars from "../list-avatar-users/list-avatar-users";
import ModalDelete from "../modal-delete";
import ReadMore from "./read-more";
import DEFAULT from "../../images/default.jpeg";

import "./style.scss";
import ModalDetailUser from "../modal-detail-user";
import moment from "moment";
import DisplayVideo from "../display-video/display-video";

function Card({ post, refetch }) {
  const queryClient = useQueryClient();

  const [visible, setVisible] = useState(false);
  const [comment, setComment] = useState(false);
  const [id, setId] = useState(null);
  const [isShown, setIsShown] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: (id) => {
      return makeRequest.delete(`/api/v1/posts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  const mutationAddComment = useMutation({
    mutationFn: (commentObject) => {
      return makeRequest.patch(
        `/api/v1/posts/${commentObject?.id}/comment/add`,
        commentObject
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
      setCommentText("");
    },
  });

  const mutationLike = useMutation({
    mutationFn: (id) => {
      return makeRequest.patch(`/api/v1/posts/like/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  const mutationUnlike = useMutation({
    mutationFn: (id) => {
      return makeRequest.patch(`/api/v1/posts/unlike/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  const mutationEditComment = useMutation({
    mutationFn: (data) => {
      return makeRequest.patch(
        `/api/v1/posts/${data?.id}/comment/${data?.commentId}/edit`,
        data
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
      setCommentText("");
      setId(null);
      setIsEdit(false);
    },
  });

  const handleAddComment = (e, postId) => {
    e.preventDefault();
    if (!user?.data?._id) {
      navigate("/login");
    }
    const addComment = {
      id: postId,
      text: commentText,
      commentId: id,
    };
    isEdit
      ? mutationEditComment.mutate(addComment)
      : mutationAddComment.mutate(addComment);
  };

  const handleDelete = () => {
    mutation.mutate(post?._id);
  };

  const handleLike = () => {
    mutationLike.mutate(post?._id);
  };

  const handleUnlike = () => {
    mutationUnlike.mutate(post?._id);
  };

  const { user } = useContext(AuthContext);

  const handleEditComment = (text, commentId) => {
    setCommentText(text);
    setIsEdit(true);
    setId(commentId);
  };

  const mutationUnfollow = useMutation({
    mutationFn: (user) => {
      return makeRequest.patch(`/api/v1/users/unfollow`, user);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["following"]);
      refetch();
    },
  });

  const handleUnfollow = (id) => {
    const userUnfollow = { idUnFollow: id };
    mutationUnfollow.mutate(userUnfollow);
  };

  const mutationFollow = useMutation({
    mutationFn: (user) => {
      return makeRequest.patch(`/api/v1/users/follow`, user);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["following"]);
      refetch();
    },
  });

  const handleFollow = (id) => {
    const userUnfollow = { idToFollow: id };
    mutationFollow.mutate(userUnfollow);
  };

  console.log("POST", post?.posterId?.following?.includes(user?.data?._id));
  return (
    <>
      <div className="card">
        <div className="card-top">
          <div className="card-top-wrapper">
            <div className="item">
              <Link to={"/profile/" + post?.posterId?._id}>
                <img
                  src={
                    (post?.posterId?.picture?.includes("default") && DEFAULT) ||
                    post?.posterId?.picture
                  }
                  alt=""
                  className="profile-user"
                />
              </Link>
            </div>
            <div className="info">
              <div className="info-wrapper">
                <div className="info-wrapper-user">
                  <span
                    className="name"
                    onMouseEnter={(e) => {
                      e.stopPropagation();
                      setIsShown(true);
                    }}
                    onMouseLeave={(e) => {
                      e.stopPropagation();
                      setIsShown(false);
                    }}
                  >
                    <Link to={"/profile/" + post?.posterId?._id}>
                      {post?.posterId?.pseudo} .
                    </Link>
                  </span>
                  {user?.data?._id &&
                    user?.data?._id !== post?.posterId?._id && (
                      <>
                        {post?.posterId?.followers?.includes(
                          user?.data?._id
                        ) ? (
                          <span
                            className="action"
                            onClick={() => handleUnfollow(post?.posterId?._id)}
                          >
                            Unfollow
                          </span>
                        ) : (
                          <span
                            className="action"
                            onClick={() => handleFollow(post?.posterId?._id)}
                          >
                            Follow
                          </span>
                        )}
                      </>
                    )}
                  {user?.data?._id === post?.posterId?._id && (
                    <span className="action">Me</span>
                  )}
                </div>
                <p className="position">
                  {post?.posterId?.desc}· {moment(post?.createdAt).fromNow()}
                </p>
              </div>
              {isShown && (
                <ModalDetailUser
                  userInfo={post?.posterId}
                  isShown={isShown}
                  setIsShown={setIsShown}
                />
              )}
            </div>
          </div>
          {user?.data?._id === post?.posterId?._id && (
            <div className="action">
              <Link to={"/post?edit=true"} state={post}>
                <span className="mdi mdi-update"></span>
              </Link>
              <span
                className="mdi mdi-delete delete-action"
                onClick={() => setVisible(true)}
              ></span>
            </div>
          )}
        </div>
        <div className="title">
          <h1>{post?.title}</h1>
        </div>
        <div className="card-body">
          <ReadMore desc={post?.desc} img={post?.img} />
          {post?.video && <DisplayVideo embedId={post?.video} />}

          {post?.img && <img src={post?.img} alt="" />}
        </div>
        <div className="card-footer">
          <div className="card-footer-wrapper">
            <div className="item">
              {user?.data?._id &&
              post?.likers.find(
                (userLiked) => userLiked?._id === user?.data?._id
              ) ? (
                <span
                  className="mdi mdi-heart icon"
                  onClick={handleUnlike}
                ></span>
              ) : (
                user?.data?._id && (
                  <span
                    className="mdi mdi-heart-outline icon"
                    onClick={handleLike}
                  ></span>
                )
              )}
            </div>

            <Avatars likers={post?.likers} total={post?.likers?.length} />

            <div className="item">
              <span className="mdi mdi-comment icon-comment"></span>
              <span
                className="text"
                onClick={() => {
                  setComment((t) => !t);
                  setId(post?._id);
                }}
              >
                {post?.comments?.length} comments
              </span>
            </div>
          </div>
          <div className="category">
            <span className="cat">Category :</span>
            <span className="name"> {post?.cat}</span>
          </div>
        </div>

        {comment && (
          <>
            <div className="comment-post">
              <div className="comment">
                <input
                  type="text"
                  placeholder={
                    isEdit
                      ? "Edit Comment"
                      : user?.data?._id
                      ? "Add Comment ..."
                      : "Please Sign in to add Comment"
                  }
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <button onClick={(e) => handleAddComment(e, post?._id)}>
                  <span className="mdi mdi-plus"></span>
                  <span className="text">
                    {isEdit
                      ? "Edit Comment"
                      : user?.data?._id
                      ? "Add Comment"
                      : "Sign in"}
                  </span>
                </button>
              </div>
            </div>
            <ListComments
              comments={post?.comments}
              id={id}
              handleEditComment={handleEditComment}
              isEdit={isEdit}
            />
          </>
        )}
      </div>
      {visible && (
        <ModalDelete setVisible={setVisible} handleDelete={handleDelete} />
      )}
    </>
  );
}

export default Card;
