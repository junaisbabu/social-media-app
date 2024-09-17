"use client";

import { Card, CardContent } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import Request from "./request";
import Contact from "./contact";
import { onSnapshot, query, where, and, or } from "firebase/firestore";
import { FriendRequestStatus, FriendRequestType, UserType } from "@/type";
import { useAuthStore } from "@/components/auth/auth-state";
import { Collections } from "@/firebase/collections";
import { firestoreService } from "@/firebase/firestore";

function RightSection() {
  const { user } = useAuthStore();
  const [friends, setFriends] = useState<UserType[] | []>([]);
  const [recievedRequest, setRecievedRequest] = useState<FriendRequestType[]>(
    []
  );

  const handleGetPeople = async () => {
    const friendsRef = firestoreService.getCollectionRef(Collections.FRIENDS);

    const q = query(
      friendsRef,
      or(
        where("from_user_id", "==", user?.uid),
        where("to_user_id", "==", user?.uid)
      )
    );

    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      let friends: UserType[] = [];

      for (const doc of querySnapshot.docs) {
        if (doc.data().from_user_id === user?.uid) {
          const docSnap = await firestoreService.getDoc(
            Collections.USERS,
            doc.data().to_user_id
          );
          if (docSnap.exists()) {
            friends.push(docSnap.data() as UserType);
          }
        } else if (doc.data().to_user_id === user?.uid) {
          const docSnap = await firestoreService.getDoc(
            Collections.USERS,
            doc.data().from_user_id
          );
          if (docSnap.exists()) {
            friends.push(docSnap.data() as UserType);
          }
        }
      }

      setFriends(friends);
    });

    return () => unsubscribe();
  };

  useEffect(() => {
    if (!user?.uid) return;

    handleGetPeople();

    const friendRequestsRef = firestoreService.getCollectionRef(
      Collections.FRIEND_REQUESTS
    );

    const q = query(
      friendRequestsRef,
      and(
        where("to_user_id", "==", user.uid),
        where("status", "==", FriendRequestStatus.PENDING)
      )
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const receivedRequestData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        doc_id: doc.id,
      })) as FriendRequestType[];

      setRecievedRequest(receivedRequestData);
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <div className="w-3/12 min-h-full overflow-hidden space-y-6">
      {recievedRequest.length ? (
        <div className="flex flex-col flex-nowrap overflow-auto no-scrollbar max-h-[40%]">
          <div className="flex justify-between items-center pl-6 pr-1 shrink-0 sticky top-0 bg-[#f4f5f8] z-10 py-2">
            <h1 className="text-zinc-400 font-medium">REQUESTS</h1>
            <div className="flex-1 min-w-4 max-w-8 h-5 p-1 text-white text-[10px] rounded-xl bg-primary flex items-center justify-center">
              <span className="block">{recievedRequest.length}</span>
            </div>
          </div>
          <ul className="space-y-2">
            {recievedRequest.map((request) => (
              <li key={request.doc_id}>
                <Request request={request} />
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {friends.length ? (
        <div className="flex flex-col flex-nowrap overflow-auto no-scrollbar max-h-[60%] pb-12">
          <div className="flex justify-between items-center pl-6 pr-1 shrink-0 sticky top-0 bg-[#f4f5f8] z-10 py-2">
            <h1 className="text-zinc-400 font-medium">FRIENDS</h1>
            <div className="flex-1 min-w-4 max-w-8 h-5 p-1 text-white text-[10px] rounded-xl bg-primary flex items-center justify-center">
              <span className="block">68</span>
            </div>
          </div>
          <Card className="shrink-0">
            <CardContent className="p-6 bg-white">
              <ul>
                {friends.map(
                  (contact: UserType) =>
                    contact.uid !== user?.uid && (
                      <li
                        key={contact.uid}
                        className="py-2 last:pb-0 first:pt-0"
                      >
                        <Contact contact={contact} />
                      </li>
                    )
                )}
              </ul>
            </CardContent>
          </Card>
        </div>
      ) : null}
    </div>
  );
}

export default RightSection;
