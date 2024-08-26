"use client";

import React, { useEffect, useState } from "react";
import PostCard from "./post-card";
import { PostType } from "@/type";
import { firestoreService } from "@/firebase/firestore";
import { Collections } from "@/firebase/collections";
import { useAuthStore } from "@/components/auth/auth-state";
import { DocumentData } from "firebase/firestore";

function SavedList() {
  const { user } = useAuthStore();

  const [posts, setPosts] = useState<PostType[]>([]);

  const getSavedPosts = async () => {
    if (!user?.uid) return;

    const savedPosts: DocumentData = await firestoreService.getDoc(
      Collections.SAVED_POSTS,
      user.uid
    );

    if (!savedPosts.exists() || !savedPosts.data()?.posts?.length) {
      setPosts([]);
      return;
    }

    const postsData = (
      await Promise.all(
        savedPosts.data().posts.map(async (docId: string) => {
          const postDoc = await firestoreService.getDoc(
            Collections.POSTS,
            docId
          );
          return postDoc.exists() ? postDoc.data() : null;
        })
      )
    ).filter((post) => post !== null);

    setPosts(postsData as PostType[]);
  };

  useEffect(() => {
    getSavedPosts();
  }, [user?.uid]);

  return (
    <div className="space-y-4">
      {posts?.map((post: PostType) => (
        <PostCard key={post.docId} post={post} />
      ))}
    </div>
  );
}

export default SavedList;
