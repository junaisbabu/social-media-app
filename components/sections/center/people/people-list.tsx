"use client";

import React, { useEffect, useState } from "react";
import PeopleCard from "./people-card";
import { FriendRequestStatus, UserType } from "@/type";
import { Collections } from "@/firebase/collections";
import { firestoreService } from "@/firebase/firestore";
import { and, onSnapshot, query, where } from "firebase/firestore";
import { useAuthStore } from "@/components/auth/auth-state";

function PeopleList() {
  const [people, setPeople] = useState<UserType[]>([]);
  const { user } = useAuthStore();

  const getFriendRequests = (currentUserId: string) => {
    const friendRequestsRef = firestoreService.getCollectionRef(
      Collections.FRIEND_REQUESTS
    );

    const q1 = query(
      friendRequestsRef,
      and(
        where("from_user_id", "==", currentUserId),
        where("status", "==", FriendRequestStatus.PENDING)
      )
    );

    const q2 = query(
      friendRequestsRef,
      and(
        where("to_user_id", "==", currentUserId),
        where("status", "==", FriendRequestStatus.PENDING)
      )
    );

    let sentTo: string[] = [];
    let receivedFrom: string[] = [];

    const unsubscribeSent = onSnapshot(q1, (querySnapshot) => {
      sentTo = querySnapshot.docs.map((doc) => doc.data().to_user_id);
      updateExcludedUsers([...sentTo, ...receivedFrom]);
    });

    const unsubscribeReceived = onSnapshot(q2, (querySnapshot) => {
      receivedFrom = querySnapshot.docs.map((doc) => doc.data().from_user_id);
      updateExcludedUsers([...sentTo, ...receivedFrom]);
    });

    const updateExcludedUsers = (excludedUserIds: string[]) => {
      getFilteredPeople(currentUserId, excludedUserIds);
    };

    return () => {
      unsubscribeSent();
      unsubscribeReceived();
    };
  };

  const getFilteredPeople = (
    currentUserId: string,
    excludedUserIds: string[]
  ) => {
    const peopleRef = firestoreService.getCollectionRef(Collections.USERS);

    const q = query(peopleRef);
    const unsubscribePeople = onSnapshot(q, (querySnapshot) => {
      const filteredPeople = querySnapshot.docs
        .filter(
          (doc) => !excludedUserIds.includes(doc.id) && doc.id !== currentUserId
        )
        .map((doc) => doc.data() as UserType);

      setPeople(filteredPeople);
    });

    return () => unsubscribePeople();
  };

  useEffect(() => {
    if (!user?.uid) return;

    const unsubscribeFriendRequests = getFriendRequests(user.uid);

    // Clean up the subscriptions when the component unmounts
    return () => {
      unsubscribeFriendRequests();
    };
  }, [user]);

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
