"use client";

import React from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { useAuthStore } from "./auth/auth-state";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Search, SquarePlus } from "lucide-react";
import { Input } from "./ui/input";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { AddStory } from "./sections/center/stories/add-story";
import { DialogTrigger } from "./ui/dialog";
import Cookies from "js-cookie";
import Link from "next/link";

function Header() {
  const { user } = useAuthStore();

  const handleSignOut = () => {
    signOut(auth).then(() => {
      Cookies.remove("userToken");
    });
  };

  return (
    <header className="w-full h-16 shrink-0 bg-white">
      <div className="w-full h-full max-w-[1360px] px-4 md:px-6 flex shrink-0 gap-4 justify-between items-center mx-auto">
        <div>
          <Link href="/">
            <h1 className="font-semibold text-base md:text-lg">Socialo</h1>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative mr-2">
            <Search
              className="absolute top-2.5 left-2 text-slate-500"
              size={16}
            />
            <Input
              className="bg-input rounded-xl pl-8"
              type="text"
              placeholder="Search"
            />
          </div>
          <AddStory>
            <DialogTrigger className="hidden md:block">
              <Button className="rounded-xl flex gap-1" type="button">
                <SquarePlus size={16} /> Create
              </Button>
            </DialogTrigger>
          </AddStory>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex items-center gap-2">
                {user ? (
                  <Avatar className="w-9 h-9 rounded-xl">
                    <AvatarImage
                      src={user.photoURL || "https://github.com/shadcn.png"}
                      alt={user.displayName || "Anonymous"}
                    />
                  </Avatar>
                ) : null}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <Link href="/profile">
                <DropdownMenuItem>View Profile</DropdownMenuItem>
              </Link>
              <DropdownMenuItem
                className="text-red-500"
                onClick={handleSignOut}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

export default Header;
