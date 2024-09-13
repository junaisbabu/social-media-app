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

  const handleAcceptOrDeclineRequest = async (
    fromUserId: string,
    toUserId: string,
    requestId: string,
    status: FriendRequestStatus
  ) => {
    setIsLoading(true);
    try {
      await firestoreService.updateDoc(Collections.FRIEND_REQUESTS, requestId, {
        status,
      });

      await handleFriendRequestResponse(
        fromUserId,
        toUserId,
        requestId,
        status
      );
    } catch (error) {
      showErrorToast(`Error ${status} friend request: ` + error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFriendRequestResponse = async (
    fromUserId: string,
    toUserId: string,
    requestId: string,
    status: FriendRequestStatus
  ) => {
    try {
      switch (status) {
        case FriendRequestStatus.ACCEPTED: {
          await firestoreService.addDoc(Collections.FRIENDS, {
            from_user_id: fromUserId,
            to_user_id: toUserId,
            timestamp: new Date().toISOString(),
          });

          break;
        }

        case FriendRequestStatus.DECLINED: {
          await firestoreService.deleteDoc(
            Collections.FRIEND_REQUESTS,
            requestId
          );

          break;
        }
      }
    } catch (error) {
      showErrorToast(`Error ${status} friend request: ` + error);
    }
  };

  return { isLoading, handleSendFriendRequest, handleAcceptOrDeclineRequest };
};
