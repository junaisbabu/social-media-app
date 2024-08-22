import { storageService } from "@/firebase/storage";

export const deleteStorageFile = async (fileUrl: string | null) => {
  if (!fileUrl) return;

  const fileName = decodeURIComponent(
    new URL(fileUrl).pathname.split("/").pop() || ""
  );
  if (fileName) await storageService.deleteFile(fileName);
};
