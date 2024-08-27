"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PostType, UserType } from "@/type";
import {
  Bookmark,
  BookmarkX,
  Ellipsis,
  Heart,
  MessageCircle,
  Pencil,
  Share2,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { firestoreService } from "@/firebase/firestore";
import { Collections } from "@/firebase/collections";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { arrayUnion, arrayRemove } from "firebase/firestore";
import { useAuthStore } from "@/components/auth/auth-state";
import { DialogTrigger } from "@/components/ui/dialog";
import { EditPost } from "./edit-post";
import { deleteStorageFile } from "@/utils/delete-storage-file";
import { useShowToast } from "@/hooks/useShowToast";

dayjs.extend(relativeTime);

function PostCard({ post }: { post: PostType }) {
  const { user } = useAuthStore();
  const [postedUser, setPostedUser] = useState<UserType>();
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const { uid, text, file, date, docId, likes } = post;

  const { showSuccessToast, showErrorToast } = useShowToast();

  useEffect(() => {
    getUser();
    isSavedPost();
  }, []);

  if (!user?.uid) return null;

  const getUser = async () => {
    try {
      const userData = await firestoreService.getDoc(Collections.USERS, uid);
      if (userData.exists()) {
        setPostedUser(userData.data() as UserType);
      } else {
        showErrorToast("getUser: No data available for user with UID:" + uid);
      }
    } catch (error) {
      showErrorToast("getUser: Error fetching user data:" + error);
    }
  };

  const isLiked = () => {
    return likes.includes(user.uid);
  };

  const likePost = async () => {
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

  const isSavedPost = async () => {
    try {
      const savedPost = await firestoreService.getDoc(
        Collections.SAVED_POSTS,
        user.uid
      );

      if (savedPost.exists()) {
        setIsSaved(savedPost.data().posts.includes(docId));
      }
    } catch (error) {
      showErrorToast("isSavedPost: Error checking saved post status:" + error);
    }
  };

  const savePost = async () => {
    try {
      const savedPost = await firestoreService.getDoc(
        Collections.SAVED_POSTS,
        user.uid
      );

      if (savedPost.exists()) {
        if (isSaved) {
          await firestoreService.updateDoc(Collections.SAVED_POSTS, user.uid, {
            posts: arrayRemove(docId),
          });
        } else {
          await firestoreService.updateDoc(Collections.SAVED_POSTS, user.uid, {
            posts: arrayUnion(docId),
          });
        }
      } else {
        await firestoreService.setDoc(Collections.SAVED_POSTS, user.uid, {
          posts: [docId],
        });
      }

      showSuccessToast(
        `Successfully ${isSaved ? "unsaved" : "saved"} post: ${docId}`
      );
    } catch (error) {
      showErrorToast("savePost: Error saving or unsaving post:" + error);
    }
  };

  const deletePost = async () => {
    try {
      await firestoreService.deleteDoc(Collections.POSTS, docId);
      await firestoreService.updateDoc(Collections.MY_POSTS, uid, {
        posts: arrayRemove(docId),
      });

      await deleteStorageFile(file);

      showSuccessToast("Successfully deleted post: " + docId);
    } catch (error) {
      showErrorToast("deletePost: Error deleting post:" + error);
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
                {dayjs(date).fromNow()}
              </span>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Ellipsis className="h-4 px-1 border rounded text-zinc-400" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {user?.uid === uid && (
                <div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                  <EditPost post={post}>
                    <DialogTrigger className="grid grid-cols-[12px_1fr] gap-1 items-center w-full place-items-start">
                      <Pencil size={12} /> Edit
                    </DialogTrigger>
                  </EditPost>
                </div>
              )}

              <DropdownMenuItem
                className="grid grid-cols-[12px_1fr] gap-1 items-center"
                onClick={savePost}
              >
                {isSaved ? (
                  <>
                    <BookmarkX size={12} /> Unsave
                  </>
                ) : (
                  <>
                    <Bookmark size={12} /> Save
                  </>
                )}
              </DropdownMenuItem>

              {user?.uid === uid && (
                <DropdownMenuItem
                  className="text-red-500 grid grid-cols-[12px_1fr] gap-1 items-center"
                  onClick={deletePost}
                >
                  <Trash2 size={12} /> Delete
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
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
        <Share2 size={20} />
      </CardFooter>
    </Card>
  );
}

export default PostCard;
