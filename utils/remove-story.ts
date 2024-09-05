import { Collections } from "@/firebase/collections";
import { firestoreService } from "@/firebase/firestore";
import { StoryType } from "@/type";
import dayjs from "dayjs";
import { arrayRemove } from "firebase/firestore";
import { deleteStorageFile } from "./delete-storage-file";

export const handleStoryExpiration = async (
  storyData: StoryType,
  storyUserId: string
) => {
  const storyCreatedTime = dayjs(storyData.created_at);
  const currentTime = dayjs();
  const hasExpired = currentTime.isAfter(storyCreatedTime.add(24, "hour"));

  if (hasExpired && storyUserId) {
    try {
      await firestoreService.updateDoc(Collections.STORIES, storyUserId, {
        stories: arrayRemove(storyData),
      });
      deleteStorageFile(storyData.image_url);
    } catch (error) {
      console.error(error);
    }
  }
};
