"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import { X } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { firestoreService } from "@/firebase/firestore";
import { Collections } from "@/firebase/collections";
import { useAuthStore } from "@/components/auth/auth-state";
import { arrayUnion } from "firebase/firestore";
import { storageService } from "@/firebase/storage";
import { useShowToast } from "@/hooks/useShowToast";

type AddStoryValue = {
  story_image: File;
};

const addStorySchema = z.object({
  story_image: z.instanceof(File, { message: "Please upload a image." }),
});

export function AddStory({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const { showErrorToast } = useShowToast();

  const form = useForm<AddStoryValue, z.infer<typeof addStorySchema>>({
    resolver: zodResolver(addStorySchema),
  });

  const onSubmit: SubmitHandler<AddStoryValue> = async (data) => {
    if (!user) return null;

    const storyFileUrl = await storageService.getDownloadFileURL(
      data?.story_image
    );

    const storyData = {
      created_at: new Date().toISOString(),
      image_url: storyFileUrl,
    };

    try {
      const storyDocSnap = await firestoreService.getDoc(
        Collections.STORIES,
        user.uid
      );

      if (storyDocSnap.exists()) {
        firestoreService.updateDoc(Collections.STORIES, user.uid, {
          stories: arrayUnion(storyData),
        });
      } else {
        await firestoreService.setDoc(Collections.STORIES, user?.uid, {
          stories: arrayUnion(storyData),
        });
      }
    } catch (error) {
      showErrorToast("Error adding story: " + error);
    }
  };

  const storyImage = form.watch("story_image");

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {children}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Story</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              {storyImage ? (
                <div className="w-full min-h-96 relative rounded-lg overflow-hidden">
                  <X
                    className="bg-white rounded-full absolute z-10 right-1 top-1 hover:bg-red-500 hover:text-white p-0.5"
                    onClick={() => form.resetField("story_image")}
                  />
                  <Image
                    className="object-contain"
                    src={URL.createObjectURL(storyImage as Blob)}
                    alt={storyImage.name}
                    fill
                  />
                </div>
              ) : (
                <FormField
                  control={form.control}
                  name="story_image"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="bg-input"
                          type="file"
                          accept="image/*"
                          multiple={false}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            const file = e.target.files
                              ? e.target.files[0]
                              : null;
                            field.onChange(file);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <Button className="mx-auto px-6 block" type="submit">
                Send
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
