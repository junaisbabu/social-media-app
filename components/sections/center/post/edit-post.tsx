"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React, { useState } from "react";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { storageService } from "@/firebase/storage";
import { useAuthStore } from "@/components/auth/auth-state";
import { firestoreService } from "@/firebase/firestore";
import { Collections } from "@/firebase/collections";
import { PostType } from "@/type";
import { useToast } from "@/components/ui/use-toast";
import { deleteStorageFile } from "@/utils/delete-storage-file";

export function EditPost({
  children,
  post,
}: {
  children: React.ReactNode;
  post: PostType;
}) {
  const { user } = useAuthStore();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [newFile, setNewFile] = useState<File | null>(null);

  const { formState, register, setValue, watch, getValues } = useForm({
    defaultValues: {
      text: post.text,
      oldFile: post.file,
    },
  });

  const handleEditPost = async () => {
    const { text, oldFile } = getValues();

    if (!user?.uid) {
      console.error("User is not logged in");
      return;
    }

    if (!text && !oldFile && !newFile) {
      return toast({
        title: "Error",
        description: "Can't save without text or a file.",
      });
    }

    const { text: isTextDirty, oldFile: isOldFileDirty } =
      formState.dirtyFields;

    let editPost: Partial<PostType> = {
      modify_at: new Date().toISOString(),
    };

    if (isTextDirty) {
      editPost.text = text;
    }

    try {
      if (newFile) {
        editPost.file = await storageService.getDownloadFileURL(newFile);
        deleteStorageFile(post.file); // remove old file
      } else if (isOldFileDirty) {
        editPost.file = null;
        deleteStorageFile(post.file); // remove old file
      }

      await firestoreService.updateDoc(Collections.POSTS, post.docId, editPost);
      setIsOpen(false);
      toast({
        title: "Success",
        description: `Successfully updated post: ${post.docId}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `Error updating post: ${error}`,
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {children}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Post</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Textarea
            className="border-none resize-none min-h-9 max-h-9 bg-input col-span-3"
            {...register("text")}
          />
          {newFile || watch("oldFile") ? (
            <div className="w-full col-span-3 min-h-80 max-h-96 rounded-xl overflow-hidden relative">
              <X
                className="right-1 top-1 absolute z-10 cursor-pointer"
                onClick={() => {
                  setValue("oldFile", "", { shouldDirty: true });
                  setNewFile(null);
                }}
              />
              <Image
                src={
                  newFile
                    ? URL.createObjectURL(newFile)
                    : watch("oldFile") || ""
                }
                alt={post.text}
                objectFit="contain"
                fill
              />
            </div>
          ) : (
            <Input
              id="file-upload"
              className="col-span-3 bg-input"
              type="file"
              accept="image/*"
              onChange={(e) => {
                setValue("oldFile", "", { shouldDirty: true });
                const file = e.target.files?.[0];
                if (file) setNewFile(file);
              }}
            />
          )}
        </div>
        <DialogFooter>
          <Button onClick={handleEditPost} disabled={!formState.isDirty}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
