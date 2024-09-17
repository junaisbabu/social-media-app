"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { UserType } from "@/type";
import { Ellipsis } from "lucide-react";
import React from "react";

function Contact({ contact }: { contact: UserType }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Avatar className="w-9 h-9 rounded-xl">
          <AvatarImage src={contact.image} alt={contact.name} />
        </Avatar>
        <span className="font-medium">{contact.name}</span>
      </div>
      <Ellipsis className="h-4 px-1 text-zinc-400" />
    </div>
  );
}

export default Contact;
