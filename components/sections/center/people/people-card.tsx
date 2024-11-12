"use client";

import { useAuthStore } from "@/components/auth/auth-state";
import { Button } from "@/components/ui/button";
import { useFriendRequest } from "@/hooks/use-friend-request";
import { PeopleType } from "@/type";
import { getUsername } from "@/utils/get-username";
import Image from "next/image";
import React from "react";

function PeopleCard({ person }: { person: PeopleType }) {
  const { uid, image, name } = person;
  const username = getUsername(name, uid);

  const { isLoading, handleSendFriendRequest } = useFriendRequest();

  const { user } = useAuthStore();

  if (!user) return null;

  return (
    <div className="w-full max-w-56 h-fit bg-white rounded-xl overflow-hidden p-4">
      <div className="relative w-[100px] h-[100px] mx-auto rounded-sm overflow-hidden">
        <Image className="object-cover" src={image} alt={name} fill />
      </div>
      <div className="text-center space-y-0.5 my-2.5">
        <span className="block font-medium text-base text-black">{name}</span>
        {username && (
          <span className="mb-2 block text-gray-400">{username}</span>
        )}
      </div>
      <Button
        className="block w-full"
        isLoading={isLoading}
        onClick={() => handleSendFriendRequest(user.uid, uid)}
      >
        Add Friend
      </Button>
    </div>
  );
}

export default PeopleCard;
