"use client";

import PostCard from "@/components/sections/center/post/post-card";
import { Collections } from "@/firebase/collections";
import { firestoreService } from "@/firebase/firestore";
import { PostType } from "@/type";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

function Page() {
  const pathname = usePathname();
  const [post, setPost] = useState<PostType>();

  const postId = pathname.split("/").pop();

  const getPost = async () => {
    if (!postId) return;
    const postData = await firestoreService.getDoc(Collections.POSTS, postId);

    if (postData.data()) {
      setPost(postData.data() as PostType);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  if (!post) return;
  return (
    <div className="grid grid-cols-4 shrink-0 gap-6 p-6 pb-0">
      <div />
      <div className="col-span-2">
        <PostCard post={post} />
      </div>
      <div />
    </div>
  );
}

export default Page;
