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

function Header() {
  const { user } = useAuthStore();

  return (
    <header className="h-14 flex justify-between items-center px-6 bg-white">
      <div>
        <h1 className="font-semibold">Socialo</h1>
      </div>
      <div className="flex items-center gap-2">
        <div className="relative mr-2">
          <Search className="absolute top-2 left-2 text-slate-500" size={16} />
          <Input
            className="bg-[#f4f5f8] rounded-xl pl-8"
            type="text"
            placeholder="Search"
          />
        </div>
        <Button className="h-8 rounded-xl flex gap-1">
          <SquarePlus size={16} /> Create
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="flex items-center gap-2">
              <Avatar className="w-8 h-8 rounded-xl">
                <AvatarImage
                  src={user?.photoURL || "https://github.com/shadcn.png"}
                  alt={user?.displayName || "Anonymous"}
                />
              </Avatar>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>View Profile</DropdownMenuItem>
            <DropdownMenuItem className="text-red-500">Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export default Header;
