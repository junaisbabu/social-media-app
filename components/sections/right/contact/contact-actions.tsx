import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserType } from "@/type";
import { Ellipsis, MessagesSquare, User, UserRoundX } from "lucide-react";
import Link from "next/link";
import React from "react";

function ContactActions({ user }: { user: UserType }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Ellipsis className="h-4 px-1 rounded text-zinc-400" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <Link href={`/profile/${user.uid}`}>
          <DropdownMenuItem className="grid grid-cols-[12px_1fr] gap-1 items-center">
            <User size={12} /> View Profile
          </DropdownMenuItem>
        </Link>
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
