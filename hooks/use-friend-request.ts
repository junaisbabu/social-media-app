"use client";

import { useState } from "react";
import { useShowToast } from "./useShowToast";
import { firestoreService } from "@/firebase/firestore";
import { Collections } from "@/firebase/collections";
import { arrayUnion } from "firebase/firestore";

export const useFriendRequest = () => {
  const { showErrorToast } = useShowToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSendFriendRequest = async (
    currentUserId: string,
    newUserId: string
  ) => {
    setIsLoading(true);
    try {
      const sendReqDocSnap = await firestoreService.getDoc(
        Collections.FRIEND_REQUESTS,
        currentUserId
      );

      if (sendReqDocSnap.exists()) {
        firestoreService.updateDoc(Collections.FRIEND_REQUESTS, currentUserId, {
          send: arrayUnion(newUserId),
        });
      } else {
        await firestoreService.setDoc(
          Collections.FRIEND_REQUESTS,
          currentUserId,
          {
            send: arrayUnion(newUserId),
          }
        );
      }

      const receiveReqDocSnap = await firestoreService.getDoc(
        Collections.FRIEND_REQUESTS,
        newUserId
      );

      if (receiveReqDocSnap.exists()) {
        firestoreService.updateDoc(Collections.FRIEND_REQUESTS, newUserId, {
          receive: arrayUnion(currentUserId),
        });
      } else {
        await firestoreService.setDoc(Collections.FRIEND_REQUESTS, newUserId, {
          receive: arrayUnion(currentUserId),
        });
      }
    } catch (error) {
      showErrorToast("Error sending friend request: " + error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, handleSendFriendRequest };
};
