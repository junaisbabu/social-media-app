import React, { useEffect, useState } from "react";
import PostCard from "./post-card";
import { PostType } from "@/type";
import { firestoreService } from "@/firebase/firestore";
import { Collections } from "@/firebase/collections";

function PostList() {
  const [posts, setPosts] = useState<PostType[]>([]);

  const getPosts = async () => {
    const postsSnap = await firestoreService.getDocs(Collections.POSTS);
    const postsData = postsSnap.docs.map((doc) => doc.data());
    if (postsData.length) {
      setPosts(postsData as PostType[]);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="space-y-4">
      {posts?.map((post: PostType) => (
        <PostCard key={`${post.date}`} post={post} />
      ))}
    </div>
  );
}

export default PostList;
