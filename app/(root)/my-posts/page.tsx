import MyPostList from "@/components/sections/center/post/my-post-list";
import React from "react";

function Page() {
  return (
    <div className="h-full w-full flex-1 rounded-xl overflow-y-auto flex flex-col flex-nowrap space-y-6 pb-14 no-scrollbar">
      <MyPostList />
    </div>
  );
}

export default Page;
