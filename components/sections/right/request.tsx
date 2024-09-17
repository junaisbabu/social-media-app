"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Collections } from "@/firebase/collections";
import { firestoreService } from "@/firebase/firestore";
import { useFriendRequest } from "@/hooks/use-friend-request";
import { useShowToast } from "@/hooks/useShowToast";
import { FriendRequestStatus, FriendRequestType, UserType } from "@/type";
import React, { useEffect, useState } from "react";

function Request({ request }: { request: FriendRequestType }) {
  const { from_user_id, to_user_id, doc_id } = request;

  const [requestUser, setRequestUser] = useState<UserType>();

  const { isLoading, handleAcceptOrDeclineRequest } = useFriendRequest();

  const { showErrorToast } = useShowToast();

  const getUser = async () => {
    try {
      const userData = await firestoreService.getDoc(
        Collections.USERS,
        from_user_id
      );
      if (userData.exists()) {
        setRequestUser(userData.data() as UserType);
      } else {
        showErrorToast(
          "getUser: No data available for user with UID:" + from_user_id
        );
      }
    } catch (error) {
      showErrorToast("getUser: Error fetching user data:" + error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Card className="shrink-0">
      <CardContent className="p-6 bg-white space-y-4">
        <div className="flex items-center gap-3">
          <Avatar className="w-9 h-9 rounded-xl">
            <AvatarImage src={requestUser?.image} alt={requestUser?.name} />
          </Avatar>
          <p className="text-[10px] text-zinc-400 flex gap-1 items-baseline">
            <span className="font-medium text-base text-black">
              {requestUser?.name}
            </span>
            wants to add you to friends
          </p>
        </div>
        <div className="flex gap-4">
          <Button
            className="flex-1 rounded-xl"
            onClick={() =>
              handleAcceptOrDeclineRequest(
                from_user_id,
                to_user_id,
                doc_id,
                FriendRequestStatus.ACCEPTED
              )
            }
          >
            Accept
          </Button>
          <Button
            className="flex-1 rounded-xl"
            variant="outline"
            onClick={() =>
              handleAcceptOrDeclineRequest(
                from_user_id,
                to_user_id,
                doc_id,
                FriendRequestStatus.DECLINED
              )
            }
          >
            Decline
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default Request;
