"use client";

import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bookmark, BookmarkX, Ellipsis, Pencil, Trash2 } from "lucide-react";
import { useAuthStore } from "@/components/auth/auth-state";
import { PostType } from "@/type";
import { EditPost } from "./edit-post";
import { DialogTrigger } from "@/components/ui/dialog";
import { firestoreService } from "@/firebase/firestore";
import { Collections } from "@/firebase/collections";
import { arrayRemove, arrayUnion } from "firebase/firestore";
import { deleteStorageFile } from "@/utils/delete-storage-file";
import { useShowToast } from "@/hooks/useShowToast";

function PostActions({ post }: { post: PostType }) {
  const { user } = useAuthStore();
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const { showSuccessToast, showErrorToast } = useShowToast();

  const { uid, docId, file } = post;

  useEffect(() => {
    isSavedPost();
  }, []);

  if (!user?.uid) return null;

  const isSavedPost = async () => {
    try {
      const savedPost = await firestoreService.getDoc(
        Collections.SAVED_POSTS,
        user.uid
      );

      if (savedPost.exists()) {
        setIsSaved(savedPost.data().posts.includes(post.docId));
      }
    } catch (error) {
      console.error("isSavedPost: Error checking saved post status:" + error);
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

      isSavedPost();
      showSuccessToast(`Post ${isSaved ? "unsaved" : "saved"} successfully.`);
    } catch (error) {
      showErrorToast(
        `Failed to ${isSaved ? "unsave" : "save"} the post. Please try again.`
      );
      console.error("savePost: Error saving or unsaving post:" + error);
    }
  };

  const deletePost = async () => {
    try {
      await firestoreService.deleteDoc(Collections.POSTS, docId);
      await firestoreService.updateDoc(Collections.MY_POSTS, uid, {
        posts: arrayRemove(docId),
      });

      await deleteStorageFile(file);

      showSuccessToast("Post deleted successfully.");
    } catch (error) {
      showErrorToast("Failed to delete post. Please try again." + error);
      console.error("deletePost: Error deleting post:" + error);
    }
  };

  return (
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
  );
}

export default PostActions;
