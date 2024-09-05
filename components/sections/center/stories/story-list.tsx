"use client";

import React, { useEffect, useState } from "react";
import StoryItem from "./story-item";
import { AddStory } from "./add-story";
import { DialogTrigger } from "@/components/ui/dialog";
import MyStory from "./my-story";
import { Collections } from "@/firebase/collections";
import { firestoreService } from "@/firebase/firestore";
import { onSnapshot, query } from "firebase/firestore";
import { StoriesType } from "@/type";
import { useAuthStore } from "@/components/auth/auth-state";

function Stories() {
  const [stories, setStories] = useState<StoriesType[]>([]);
  const { user } = useAuthStore();

  useEffect(() => {
    const storiesRef = firestoreService.getCollectionRef(Collections.STORIES);
    const q = query(storiesRef);

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const storyData = querySnapshot.docs.map((doc) => {
        return {
          docId: doc.id,
          ...doc.data(),
        };
      }) as StoriesType[];

      setStories(storyData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="shrink-0 rounded-xl overflow-hidden">
      <ul className="flex gap-3 items-center flex-nowrap overflow-y-hidden overflow-x-auto no-scrollbar">
        <li>
          <AddStory>
            <DialogTrigger>
              <MyStory />
            </DialogTrigger>
          </AddStory>
        </li>
        {stories.flatMap((story) =>
          story.stories.length && story.docId !== user?.uid ? (
            <li key={story.docId}>
              <StoryItem storyData={story} />
            </li>
          ) : null
        )}
      </ul>
    </div>
  );
}

export default Stories;
