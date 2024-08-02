import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import React from "react";
import Story from "@/public/assets/story.jpg";

function StoryItem() {
  return (
    <div className="rounded-xl w-32 h-56 overflow-hidden relative">
      <Image src={Story} alt="Story" fill />
      <Avatar className="h-6 w-6 rounded-lg absolute top-5 left-5 outline outline-2 outline-white outline-offset-2">
        <AvatarImage src="https://github.com/shadcn.png" alt="story" />
      </Avatar>

      <span className="w-full text-center font-medium absolute -translate-x-1/2 left-1/2 bottom-4 text-white">
        Sam Brown
      </span>
    </div>
  );
}

export default StoryItem;
