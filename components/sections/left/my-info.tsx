"use client";

import { useAuthStore } from "@/components/auth/auth-state";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { getUsername } from "@/utils/get-username";
import React from "react";

function MyInfo() {
  const { user } = useAuthStore();

  if (!user) return null;

  const { uid, displayName, photoURL } = user;

  const username = getUsername(displayName, uid);

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6 bg-white">
        <div className="flex items-center gap-3">
          <Avatar className="w-9 h-9 rounded-xl">
            <AvatarImage
              src={photoURL || "https://github.com/shadcn.png"}
              alt={displayName || "Anonymous"}
            />
          </Avatar>
          <div className="flex flex-col">
            <h1 className="font-medium">{displayName}</h1>
            {username && (
              <span className="text-[10px] text-zinc-400">{username}</span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default MyInfo;
