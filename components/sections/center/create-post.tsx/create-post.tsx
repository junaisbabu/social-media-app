"use client";

import { useAuthStore } from "@/components/auth/auth-state";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { ChangeEvent, useState } from "react";
import { ImagePlus, Trash2 } from "lucide-react";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { arrayUnion } from "firebase/firestore";
import { firestoreService } from "@/firebase/firestore";
import { Collections } from "@/firebase/collections";
import { storageService } from "@/firebase/storage";
import Image from "next/image";

type CreatePostValues = {
  text: string;
  file: File | null;
};

const createPostSchema = z.object({
  text: z.string().optional(),
  file: z.instanceof(File).optional(),
});

function CreatePost() {
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useAuthStore();
  const { toast } = useToast();

  const form = useForm<CreatePostValues, z.infer<typeof createPostSchema>>({
    defaultValues: {
      text: "",
      file: null,
    },
    // resolver: zodResolver(createPostSchema),
  });

  const file = form.watch("file");

  const onSubmit: SubmitHandler<CreatePostValues> = async (data) => {
    if (!data.text && !data.file) {
      return toast({
        title: "Error",
        description: "Nothing to share.",
      });
    }

    if (!user?.uid) {
      return;
    }

    setIsLoading(true);

    try {
      const url = await storageService.getDownloadFileURL(data?.file);

      const newPost = {
        uid: user?.uid,
        text: data?.text || "",
        file: url || null,
        created_at: new Date().toISOString(),
        likes: [],
      };

      const newPostDocRef = await firestoreService.addDoc(
        Collections.POSTS,
        newPost
      );

      const docSnap = await firestoreService.getDoc(
        Collections.MY_POSTS,
        user.uid
      );

      if (docSnap.exists()) {
        await firestoreService.updateDoc(Collections.MY_POSTS, user.uid, {
          posts: arrayUnion(newPostDocRef.id),
        });
      } else {
        await firestoreService.setDoc(Collections.MY_POSTS, user.uid, {
          posts: [newPostDocRef.id],
        });
      }

      // Clearing the values
      form.setValue("text", "");
      form.setValue("file", null);
    } catch (e) {
      console.error("Error sharing post: ", e);
    }

    setIsLoading(false);
  };

  return (
    <div className="p-3 bg-white rounded-xl space-y-4">
      <Form {...form}>
        <form
          className="flex items-center gap-2"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <Avatar className="w-9 h-9 rounded-xl">
            <AvatarImage
              src={user?.photoURL || "https://github.com/shadcn.png"}
              alt={user?.displayName || "Anonymous"}
            />
          </Avatar>
          <div className="relative flex-1">
            {!file && (
              <>
                <ImagePlus className="absolute top-2.5 right-2" size={20} />
                <FormField
                  control={form.control}
                  name="file"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="w-9 h-9 absolute right-0 opacity-0"
                          type="file"
                          accept="image/*"
                          multiple={false}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        const file = e.target.files ? e.target.files[0] : null;
                            field.onChange(file);
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </>
            )}
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      className="border-none resize-none min-h-9 max-h-9 pr-10"
                      placeholder="What's on your mind?"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {file && (
            <div className="w-9 h-9 relative rounded-lg overflow-hidden hover:bg-red-500 group">
              <div
                className="text-white hidden group-hover:flex cursor-pointer w-full h-full items-center justify-center"
                onClick={() => form.setValue("file", null)}
              >
                <Trash2 />
              </div>
              <Image
                className="object-contain group-hover:hidden"
                src={URL.createObjectURL(file as Blob)}
                alt={file.name}
                fill
              />
            </div>
          )}

          <Button
            className="rounded-xl min-w-[87px]"
            type="submit"
            disabled={isLoading}
            isLoading={isLoading}
          >
            Share Post
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default CreatePost;
