import React from "react";
import Card from "../card";

import "./style.scss";

function Posts({ posts, refetch }) {
  return (
    <div className="posts">
      {posts?.map((post) => (
        <Card key={post?._id} post={post} refetch={refetch} />
      ))}
    </div>
  );
}

export default Posts;
