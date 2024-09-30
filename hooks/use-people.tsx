"use client";

import { useAuthStore } from "@/components/auth/auth-state";
import { Collections } from "@/firebase/collections";
import { firestoreService } from "@/firebase/firestore";
import { FriendRequestStatus, UserType } from "@/type";
import { and, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

export const usePeople = () => {
  const { user } = useAuthStore();
  const [people, setPeople] = useState<UserType[]>([]);

  const getFriendRequests = (currentUserId: string) => {
    const friendRequestsRef = firestoreService.getCollectionRef(
      Collections.FRIEND_REQUESTS
    );

    const q1Pending = query(
      friendRequestsRef,
      and(
        where("from_user_id", "==", currentUserId),
        where("status", "==", FriendRequestStatus.PENDING)
      )
    );

    const q2Pending = query(
      friendRequestsRef,
      and(
        where("to_user_id", "==", currentUserId),
        where("status", "==", FriendRequestStatus.PENDING)
      )
    );

    const q1Accepted = query(
      friendRequestsRef,
      and(
        where("from_user_id", "==", currentUserId),
        where("status", "==", FriendRequestStatus.ACCEPTED)
      )
    );

    const q2Accepted = query(
      friendRequestsRef,
      and(
        where("to_user_id", "==", currentUserId),
        where("status", "==", FriendRequestStatus.ACCEPTED)
      )
    );

    let sentTo: string[] = [];
    let receivedFrom: string[] = [];

    const updateExcludedUsers = (excludedUserIds: string[]) => {
      getFilteredPeople(currentUserId, excludedUserIds);
    };

    const unsubscribeSentPending = onSnapshot(q1Pending, (querySnapshot) => {
      sentTo = querySnapshot.docs.map((doc) => doc.data().to_user_id);
      updateExcludedUsers([...sentTo, ...receivedFrom]);
    });

    const unsubscribeReceivedPending = onSnapshot(
      q2Pending,
      (querySnapshot) => {
        receivedFrom = querySnapshot.docs.map((doc) => doc.data().from_user_id);
        updateExcludedUsers([...sentTo, ...receivedFrom]);
      }
    );

    const unsubscribeSentAccepted = onSnapshot(q1Accepted, (querySnapshot) => {
      const acceptedSent = querySnapshot.docs.map(
        (doc) => doc.data().to_user_id
      );
      sentTo = [...sentTo, ...acceptedSent];
      updateExcludedUsers([...sentTo, ...receivedFrom]);
    });

    const unsubscribeReceivedAccepted = onSnapshot(
      q2Accepted,
      (querySnapshot) => {
        const acceptedReceived = querySnapshot.docs.map(
          (doc) => doc.data().from_user_id
        );
        receivedFrom = [...receivedFrom, ...acceptedReceived];
        updateExcludedUsers([...sentTo, ...receivedFrom]);
      }
    );

    // Cleanup function for all listeners
    return () => {
      unsubscribeSentPending();
      unsubscribeReceivedPending();
      unsubscribeSentAccepted();
      unsubscribeReceivedAccepted();
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

  return { people, setPeople };
};
