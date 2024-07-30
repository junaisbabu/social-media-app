import React from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { useStore } from "zustand";
import { useAuthStore } from "../auth/auth-state";

function Header() {
  const { user } = useAuthStore();
  return (
    <header className="h-14 flex justify-between items-center px-6 bg-white">
      <div>
        <h1 className="text-base font-semibold">Socialo</h1>
      </div>
      <nav></nav>
      <div>
        <div className="flex items-center gap-2">
          <Avatar className="w-8 h-8">
            <AvatarImage
              src={user?.photoURL || "https://github.com/shadcn.png"}
              alt={user?.displayName || "Anonymous"}
            />
          </Avatar>
          <span className="text-sm font-medium">{user?.displayName}</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
