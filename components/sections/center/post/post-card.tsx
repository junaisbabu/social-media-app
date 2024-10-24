"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { PostType, UserType } from "@/type";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { firestoreService } from "@/firebase/firestore";
import { Collections } from "@/firebase/collections";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { arrayUnion, arrayRemove } from "firebase/firestore";
import { useAuthStore } from "@/components/auth/auth-state";
import { useShowToast } from "@/hooks/useShowToast";
import PostActions from "./post-actions";

dayjs.extend(relativeTime);

function PostCard({ post }: { post: PostType }) {
  const { user } = useAuthStore();
  const [postedUser, setPostedUser] = useState<UserType>();
  const { uid, text, file, created_at, docId, likes } = post;

  const { showSuccessToast, showErrorToast } = useShowToast();

  useEffect(() => {
    const getUser = async () => {
      try {
        const userData = await firestoreService.getDoc(Collections.USERS, uid);
        if (userData.exists()) {
          setPostedUser(userData.data() as UserType);
        } else {
          showErrorToast("No data available for user with UID:" + uid);
        }
      } catch (error) {
        showErrorToast("Failed to fetch user data. Please try again.");
        console.error("getUser: Error fetching user data:" + error);
      }
    };

    getUser();
  }, []);

  const isLiked = () => {
    if (!user?.uid) return null;

    return likes.includes(user.uid);
  };

  const likePost = async () => {
    if (!user?.uid) return null;

    try {
      if (isLiked()) {
        await firestoreService.updateDoc(Collections.POSTS, docId, {
          likes: arrayRemove(user.uid),
        });
      } else {
        await firestoreService.updateDoc(Collections.POSTS, docId, {
          likes: arrayUnion(user.uid),
        });
      }
    } catch (error) {
      showErrorToast("likePost: Error updating like status:" + error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <Avatar className="w-9 h-9 rounded-xl">
              <AvatarImage src={postedUser?.image} alt={postedUser?.name} />
            </Avatar>
            <div className="flex flex-col">
              <h1 className="font-medium">{postedUser?.name}</h1>
              <span className="text-[10px] text-zinc-400">
                {`${dayjs(created_at).fromNow()} ${
                  post?.modified_at ? "(edited)" : ""
                }`}
              </span>
            </div>
          </div>
          {user ? <PostActions post={post} /> : null}
        </div>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="space-y-3">
          <p className="leading-6">{text}</p>
          {file && (
            <div className="w-full min-h-80 max-h-96 rounded-xl overflow-hidden relative">
              <Image src={file} alt={text} objectFit="contain" fill />
            </div>
          )}
        </div>
      </CardContent>
      {user ? (
        <CardFooter className="flex justify-around items-center">
          <div
            className="flex gap-1 items-center cursor-pointer"
            onClick={likePost}
          >
            <Heart
              size={20}
              fill={isLiked() ? "#E31B23" : "#ffffff"}
              stroke={isLiked() ? "#E31B23" : "#000"}
            />
            <span className="text-zinc-400">{post.likes.length}</span>
          </div>

          <div className="flex gap-1 items-center">
            <MessageCircle size={20} />
            <span className="text-zinc-400">38</span>
          </div>
          <Share2
            size={20}
            onClick={() => {
              navigator.clipboard
                .writeText(
                  `${process.env.NEXT_PUBLIC_DOMAIN}/post/${post.docId}`
                )
                .then(() => {
                  showSuccessToast(
                    "Copied the post link! Feel free to share it!"
                  );
                })
                .catch((error) => {
                  console.log("Failed to copy: ", error);
                  showErrorToast("Failed to copy. Please try again.");
                });
            }}
          />
        </CardFooter>
      ) : null}
    </Card>
  );
}

export default PostCard;
