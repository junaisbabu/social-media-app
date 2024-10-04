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
    const q = query(postsRef, orderBy("created_at", "desc"), limit(20));

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
    <ul className="space-y-4">
      {posts?.map((post: PostType) => (
        <li key={post.docId} className="last:pb-4">
          <PostCard post={post} />
        </li>
      ))}
    </ul>
  );
}

export default PostList;
