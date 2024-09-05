"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { StoriesType, UserType } from "@/type";
import { Collections } from "@/firebase/collections";
import { firestoreService } from "@/firebase/firestore";
import { useShowToast } from "@/hooks/useShowToast";
import { handleStoryExpiration } from "@/utils/remove-story";

function StoryItem({ storyData }: { storyData: StoriesType }) {
  const { docId, stories } = storyData;

  const [storyUser, setStoryUser] = useState<UserType>();
  const { showErrorToast } = useShowToast();

  const getUser = async () => {
    try {
      const userData = await firestoreService.getDoc(Collections.USERS, docId);
      if (userData.exists()) {
        setStoryUser(userData.data() as UserType);
      }
    } catch (error) {
      showErrorToast("getUser: Error fetching user data:" + error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    const intervals: NodeJS.Timeout[] = [];

    if (storyUser) {
      stories.forEach((story) => {
        const interval = setInterval(() => {
          handleStoryExpiration(story, storyUser.uid);
        }, 1000);

        intervals.push(interval);
      });
    }

    return () => {
      intervals.forEach(clearInterval);
    };
  }, [storyUser, stories]);

  return (
    <div className="rounded-xl w-32 h-56 overflow-hidden relative">
      <Image
        className="object-cover"
        src={stories[stories.length - 1].image_url}
        alt="Story"
        fill
      />
      <Avatar className="h-6 w-6 rounded-lg absolute top-5 left-5 outline outline-2 outline-white outline-offset-2">
        <AvatarImage src={storyUser?.image} alt={storyUser?.name} />
      </Avatar>

      <span className="w-full text-center font-medium absolute -translate-x-1/2 left-1/2 bottom-4 text-white">
        {storyUser?.name}
      </span>
    </div>
  );
}

export default StoryItem;
