import MyPostList from "@/components/sections/center/post/my-post-list";
import React from "react";

function Page() {
  return (
    <div className="h-full w-full flex-1 rounded-xl overflow-y-auto flex flex-col flex-nowrap space-y-4 pb-14 no-scrollbar">
      <h1 className="font-medium text-lg">My Posts</h1>
      <MyPostList />
    </div>
  );
}

export default Page;
