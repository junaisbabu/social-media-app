"use client";

import { Card, CardContent } from "@/components/ui/card";
import { PeopleType } from "@/type";
import React from "react";
import Contact from "./contact/contact";
import { useAuthStore } from "@/components/auth/auth-state";

function FriendsOrPeople({
  users,
  title,
  noOfUsers,
}: {
  users: PeopleType[];
  title: string;
  noOfUsers: number;
}) {
  const { user } = useAuthStore();

  return (
    <div className="flex flex-col flex-nowrap overflow-auto no-scrollbar max-h-[60%] pb-12">
      <div className="flex justify-between items-center pl-6 pr-1 shrink-0 sticky top-0 bg-[#f4f5f8] z-10 py-2">
        <h1 className="text-zinc-400 font-medium">{title}</h1>
        <div className="flex-1 min-w-4 max-w-8 h-5 p-1 text-white text-[10px] rounded-xl bg-primary flex items-center justify-center">
          <span className="block">{noOfUsers}</span>
        </div>
      </div>
      <Card className="shrink-0">
        <CardContent className="p-6 bg-white">
          <ul>
            {users.map(
              (contact: PeopleType) =>
                contact.uid !== user?.uid && (
                  <li key={contact.uid} className="py-2 last:pb-0 first:pt-0">
                    <Contact
                      contact={contact}
                      isFriend={title === "FRIENDS" ? true : false}
                    />
                  </li>
                )
            )}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

export default FriendsOrPeople;
