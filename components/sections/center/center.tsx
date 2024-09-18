import React from "react";
import Stories from "./stories/story-list";
import CreatePost from "./create-post.tsx/create-post";
import PostList from "./post/post-list";

function CenterSection() {
  return (
    <div className="h-full w-full flex-1 rounded-xl flex flex-col flex-nowrap space-y-6">
      <Stories />
      <div className="space-y-5">
        <CreatePost />
        <PostList />
      </div>
    </div>
  );
}

export default CenterSection;
