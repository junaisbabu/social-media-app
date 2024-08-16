import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { storage } from "@/firebase/firebase";

class StorageService {
  getDownloadFileURL = async (file: File | null): Promise<string | null> => {
    if (!file) return null;

    const imageRef = ref(storage, `posts/${file.name}`);
    const snapshot = await uploadBytes(imageRef, file);
    return await getDownloadURL(snapshot.ref); // return: url
  };

  deleteFile = async (file: string) => {
    const fileRef = ref(storage, file);

    return await deleteObject(fileRef);
  };
}

export const storageService = new StorageService();
