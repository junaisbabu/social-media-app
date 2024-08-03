import React from "react";
import PostCard from "./post-card";

function PostList() {
  return (
    <div className="space-y-4">
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
    </div>
  );
}

export default PostList;
