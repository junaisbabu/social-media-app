import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";

function Request() {
  return (
    <Card className="shrink-0">
      <CardContent className="p-6 bg-white space-y-4">
        <div className="flex items-center gap-3">
          <Avatar className="w-9 h-9 rounded-xl">
            <AvatarImage
              src={"https://github.com/shadcn.png"}
              alt={"Anonymous"}
            />
          </Avatar>
          <p className="text-[10px] text-zinc-400 flex gap-1 items-baseline">
            <span className="font-medium text-base text-black">Ajmal Khan</span>
            wants to add you to friends
          </p>
        </div>
        <div className="flex gap-4">
          <Button className="flex-1 rounded-xl">Accept</Button>
          <Button className="flex-1 rounded-xl" variant="outline">
            Decline
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default Request;
