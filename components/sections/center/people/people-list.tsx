"use client";

import React from "react";
import PeopleCard from "./people-card";
import { useAuthStore } from "@/components/auth/auth-state";
import { usePeople } from "@/hooks/use-people";

function PeopleList() {
  const { user } = useAuthStore();
  const { people } = usePeople();

  return (
    <div className="h-full w-full flex flex-row flex-wrap justify-center gap-6 overflow-y-auto no-scrollbar">
      {people.map((person) =>
        user?.uid !== person.uid ? (
          <PeopleCard key={person.uid} person={person} />
        ) : null
      )}
    </div>
  );
}

export default PeopleList;
