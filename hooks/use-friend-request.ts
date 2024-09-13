"use client";

import { useState } from "react";
import { useShowToast } from "./useShowToast";
import { firestoreService } from "@/firebase/firestore";
import { Collections } from "@/firebase/collections";
import { FriendRequestStatus } from "@/type";

export const useFriendRequest = () => {
  const { showErrorToast } = useShowToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSendFriendRequest = async (
    fromUserId: string,
    toUserId: string
  ) => {
    setIsLoading(true);
    try {
      await firestoreService.addDoc(Collections.FRIEND_REQUESTS, {
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

  const handleAcceptOrDeclineRequest = (
    docId: string,
    status: FriendRequestStatus
  ) => {
    setIsLoading(true);
    try {
      firestoreService.updateDoc(Collections.FRIEND_REQUESTS, docId, {
        status,
      });
    } catch (error) {
      showErrorToast(`Error ${status} friend request: ` + error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, handleSendFriendRequest, handleAcceptOrDeclineRequest };
};
