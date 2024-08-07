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
import {
  Bookmark,
  Ellipsis,
  Heart,
  MessageCircle,
  Pencil,
  Share2,
  Trash2,
} from "lucide-react";
import React from "react";

function PostCard() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <Avatar className="w-9 h-9 rounded-xl">
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
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Ellipsis className="h-4 px-1 border rounded text-zinc-400" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="grid grid-cols-[12px_1fr] gap-1 items-center">
                <Pencil size={12} /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="grid grid-cols-[12px_1fr] gap-1 items-center">
                <Bookmark size={12} /> Save
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-500 grid grid-cols-[12px_1fr] gap-1 items-center">
                <Trash2 size={12} /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-6 pt-0">
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
