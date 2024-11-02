"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Collections } from "@/firebase/collections";
import { firestoreService } from "@/firebase/firestore";
import { useShowToast } from "@/hooks/useShowToast";
import { PostType, UserType } from "@/type";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";

function PostInfo({ post }: { post: PostType }) {
  const [postedUser, setPostedUser] = useState<UserType>();

  const { showErrorToast } = useShowToast();

  useEffect(() => {
    const getUser = async () => {
      try {
        const userData = await firestoreService.getDoc(
          Collections.USERS,
          post.uid
        );
        if (userData.exists()) {
          setPostedUser(userData.data() as UserType);
        } else {
          showErrorToast("No data available for user with UID:" + post.uid);
        }
      } catch (error) {
        showErrorToast("Failed to fetch user data. Please try again.");
        console.error("getUser: Error fetching user data:" + error);
      }
    };

    getUser();
  }, []);

  return (
    <div className="flex gap-2 items-center">
      <Avatar className="w-9 h-9 rounded-xl">
        <AvatarImage src={postedUser?.image} alt={postedUser?.name} />
      </Avatar>
      <div className="flex flex-col">
        <h1 className="font-medium">{postedUser?.name}</h1>
        <span className="text-[10px] text-zinc-400">
          {`${dayjs(post.created_at).fromNow()} ${
            post?.modified_at ? "(edited)" : ""
          }`}
        </span>
      </div>
    </div>
  );
}

export default PostInfo;
