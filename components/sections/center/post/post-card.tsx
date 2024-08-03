import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Ellipsis, Heart, MessageCircle, Share2 } from "lucide-react";
import React from "react";

function PostCard() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <Avatar className="w-8 h-8 rounded-xl">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="Anonymous"
              />
            </Avatar>
            <div className="flex flex-col">
              <h1 className="font-medium">Sam Brown</h1>
              <span className="text-[10px] text-zinc-400">12 hours ago</span>
            </div>
          </div>
          <Ellipsis className="h-4 px-1 border rounded text-zinc-400" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <p className="leading-6">
            Hello World! Hello World! Hello World! Hello World! Hello World!
            Hello World! Hello World! Hello World! Hello World! Hello World!
            Hello World!
          </p>
          <div className="w-full min-h-80 max-h-96 bg-blue-200 rounded-xl overflow-hidden"></div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-around items-center">
        <div className="flex gap-1 items-center">
          <Heart size={20} />
          <span className="text-zinc-400">517</span>
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
