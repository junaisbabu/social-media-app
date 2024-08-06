import { useAuthStore } from "@/components/auth/auth-state";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { ImagePlus } from "lucide-react";

function CreatePost() {
  const { user } = useAuthStore();

  return (
    <div className="p-3 bg-white rounded-xl space-y-4">
      <div className="flex items-center gap-2">
        <Avatar className="w-9 h-9 rounded-xl">
          <AvatarImage
            src={user?.photoURL || "https://github.com/shadcn.png"}
            alt={user?.displayName || "Anonymous"}
          />
        </Avatar>
        <div className="relative flex-1">
          <ImagePlus className="absolute top-2 right-2" size={24} />
          <Input
            className="w-9 h-9 absolute right-0 opacity-0"
            type="file"
            accept="image/*"
          />
          <Textarea
            className="border-none resize-none min-h-9 max-h-9 pr-10"
            placeholder="What's on your mind?"
          />
        </div>
        <Button className="rounded-xl">Share Post</Button>
      </div>
    </div>
  );
}

export default CreatePost;
