"use client";

import React, { useEffect, useState } from "react";
import PostCard from "./post-card";
import { PostType } from "@/type";
import { query, orderBy, limit, onSnapshot } from "firebase/firestore";
import { firestoreService } from "@/firebase/firestore";
import { Collections } from "@/firebase/collections";

function PostList() {
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    const postsRef = firestoreService.getCollectionRef(Collections.POSTS);
    const q = query(postsRef, orderBy("date", "desc"), limit(20));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const postsData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        docId: doc.id,
      })) as PostType[];

      setPosts(postsData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="space-y-4">
      {posts?.map((post: PostType) => (
        <PostCard key={post.docId} post={post} />
      ))}
    </div>
  );
}

export default PostList;
