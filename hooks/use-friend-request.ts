"use client";

import { useState } from "react";
import { useShowToast } from "./useShowToast";
import { firestoreService } from "@/firebase/firestore";
import { Collections } from "@/firebase/collections";

export const useFriendRequest = () => {
  const { showErrorToast } = useShowToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSendFriendRequest = async (
    fromUserId: string,
    toUserId: string
  ) => {
    setIsLoading(true);
    try {
      firestoreService.addDoc(Collections.FRIEND_REQUESTS, {
        from_user_id: fromUserId,
        to_user_id: toUserId,
        status: "pending",
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      showErrorToast("Error sending friend request: " + error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, handleSendFriendRequest };
};
