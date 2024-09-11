"use client";

import React, { useEffect, useState } from "react";
import PeopleCard from "./people-card";
import { UserType } from "@/type";
import { Collections } from "@/firebase/collections";
import { firestoreService } from "@/firebase/firestore";
import { onSnapshot, query } from "firebase/firestore";
import { useAuthStore } from "@/components/auth/auth-state";

function PeopleList() {
  const [people, setPeople] = useState<UserType[]>([]);
  const { user } = useAuthStore();

  useEffect(() => {
    const usersRef = firestoreService.getCollectionRef(Collections.USERS);
    const q = query(usersRef);

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const usersData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
      })) as UserType[];

      setPeople(usersData);
    });

    return () => unsubscribe();
  }, []);
  return (
    <div className="w-6/12 h-full rounded-xl pb-14">
      <div className="h-full w-full flex flex-row flex-wrap justify-center gap-6 overflow-y-auto no-scrollbar">
        {people.map((person) =>
          user?.uid !== person.uid ? (
            <PeopleCard key={person.uid} person={person} />
          ) : null
        )}
      </div>
    </div>
  );
}

export default PeopleList;
