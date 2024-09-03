"use client";

import { useAuthStore } from "@/components/auth/auth-state";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Collections } from "@/firebase/collections";
import { firestoreService } from "@/firebase/firestore";
import { cn } from "@/lib/utils";
import { StoriesType } from "@/type";
import { SquarePlus } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const MyStory = () => {
  const { user } = useAuthStore();
  const [myStory, setMyStory] = useState<StoriesType>();

  useEffect(() => {
    const getMyStory = async () => {
      if (!user?.uid) return;

      const myStoryData = await firestoreService.getDoc(
        Collections.STORIES,
        user?.uid
      );
      if (myStoryData.exists() && myStoryData.data().stories.length) {
        setMyStory({
          docId: myStoryData.id,
          stories: myStoryData.data().stories,
        });
      }
    };

    getMyStory();
  }, [user?.uid]);

  return (
    <div
      className={cn(
        "rounded-xl w-32 h-56 overflow-hidden relative bg-gray-200 hover:text-primary cursor-pointer",
        {
          "text-white": myStory?.stories.length,
        }
      )}
    >
      {myStory?.stories && user?.displayName && (
        <Image
          className="object-cover"
          src={myStory.stories[myStory.stories.length - 1].image_url}
          alt={user.displayName}
          fill
        />
      )}

      <Avatar className="h-6 w-6 rounded-lg absolute top-5 left-5 outline outline-2 outline-white outline-offset-2">
        <AvatarImage
          src={user?.photoURL || "https://github.com/shadcn.png"}
          alt={user?.displayName || "Anonymous"}
        />
      </Avatar>

      <div className="w-full h-full absolute flex flex-col items-center justify-center">
        <SquarePlus size={20} />
        <span className="w-full text-center font-medium">Add Story</span>
      </div>
    </div>
  );
};

export default MyStory;
