"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { PostType } from "@/type";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import Image from "next/image";
import { firestoreService } from "@/firebase/firestore";
import { Collections } from "@/firebase/collections";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { arrayUnion, arrayRemove } from "firebase/firestore";
import { useAuthStore } from "@/components/auth/auth-state";
import { useShowToast } from "@/hooks/useShowToast";
import PostInfo from "./post-info";
import PostActions from "./post-actions";

dayjs.extend(relativeTime);

function PostCard({ post }: { post: PostType }) {
  const { user } = useAuthStore();
  const { text, file, docId, likes } = post;

  const { showSuccessToast, showErrorToast } = useShowToast();

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
      <CardHeader className="p-2 md:p-4">
        <div className="flex items-center justify-between">
          <PostInfo post={post} />
          {user ? <PostActions post={post} /> : null}
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-2 md:px-6 md:pb-4 pt-0">
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
        <CardFooter className="grid grid-cols-3 place-items-center">
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
