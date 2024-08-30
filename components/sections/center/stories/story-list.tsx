"use client";

import React from "react";
import StoryItem from "./story-item";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { SquarePlus } from "lucide-react";
import { useAuthStore } from "@/components/auth/auth-state";
import { AddStory } from "./add-story";
import { DialogTrigger } from "@/components/ui/dialog";

const MyStory = () => {
  const { user } = useAuthStore();

  if (!user) return null;

  return (
    <div className="rounded-xl w-32 h-56 overflow-hidden relative bg-gray-200 hover:text-primary cursor-pointer">
      <Avatar className="h-6 w-6 rounded-lg absolute top-5 left-5 outline outline-2 outline-white outline-offset-2">
        <AvatarImage
          src={user?.photoURL || "https://github.com/shadcn.png"}
          alt={user?.displayName || "Anonymous"}
        />
      </Avatar>

      <div className="w-full h-full absolute flex flex-col items-center justify-center">
        <SquarePlus size={20} />
        <span className="w-full text-center font-medium">Add Story</span>
      </div>
    </div>
  );
};

function Stories() {
  return (
    <div className="shrink-0 rounded-xl overflow-hidden">
      <ul className="flex gap-3 items-center flex-nowrap overflow-y-hidden overflow-x-auto no-scrollbar">
        <li>
          <AddStory>
            <DialogTrigger>
              <MyStory />
            </DialogTrigger>
          </AddStory>
        </li>
        <li>
          <StoryItem />
        </li>
        <li>
          <StoryItem />
        </li>
        <li>
          <StoryItem />
        </li>
        <li>
          <StoryItem />
        </li>
        <li>
          <StoryItem />
        </li>
        <li>
          <StoryItem />
        </li>
      </ul>
    </div>
  );
}

export default Stories;
