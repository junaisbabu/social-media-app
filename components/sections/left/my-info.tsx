"use client";

import { useAuthStore } from "@/components/auth/auth-state";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";

function MyInfo() {
  const { user } = useAuthStore();

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6 bg-white">
        <div className="flex items-center gap-3">
          <Avatar className="w-9 h-9 rounded-xl">
            <AvatarImage
              src={user?.photoURL || "https://github.com/shadcn.png"}
              alt={user?.displayName || "Anonymous"}
            />
          </Avatar>
          <div className="flex flex-col">
            <h1 className="font-medium">Sam Brown</h1>
            <span className="text-[10px] text-zinc-400">@sambrown</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default MyInfo;
