import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis, MessagesSquare, User, UserRoundX } from "lucide-react";
import React from "react";

function ContactActions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Ellipsis className="h-4 px-1 rounded text-zinc-400" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="grid grid-cols-[12px_1fr] gap-1 items-center">
          <User size={12} /> View Profile
        </DropdownMenuItem>
        <DropdownMenuItem className="grid grid-cols-[12px_1fr] gap-1 items-center">
          <MessagesSquare size={12} /> Message
        </DropdownMenuItem>
        <DropdownMenuItem className="text-red-500 grid grid-cols-[12px_1fr] gap-1 items-center">
          <UserRoundX size={12} /> Unfollow
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ContactActions;
