"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { UserType } from "@/type";
import React from "react";
import ContactActions from "./contact-actions";
import { UserRoundPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFriendRequest } from "@/hooks/use-friend-request";
import { useAuthStore } from "@/components/auth/auth-state";

function Contact({
  contact,
  isFriend,
}: {
  contact: UserType;
  isFriend: boolean;
}) {
  const { user } = useAuthStore();
  const { isLoading, handleSendFriendRequest } = useFriendRequest();

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Avatar className="w-9 h-9 rounded-xl">
          <AvatarImage src={contact.image} alt={contact.name} />
        </Avatar>
        <span className="font-medium">{contact.name}</span>
      </div>
      {isFriend ? (
        <ContactActions user={contact} />
      ) : (
        <Button
          className="p-0 m-0 h-8 w-8 rounded-sm"
          isLoading={isLoading}
          onClick={() => {
            if (user) handleSendFriendRequest(user.uid, contact.uid);
          }}
        >
          <UserRoundPlus strokeWidth={1.8} size={20} />
        </Button>
      )}
    </div>
  );
}

export default Contact;
