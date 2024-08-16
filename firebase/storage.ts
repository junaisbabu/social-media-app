import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/firebase/firebase";

class StorageService {
  getDownloadFileURL = async (file: File | null): Promise<string | null> => {
    if (!file) return null;

    const imageRef = ref(storage, `posts/${file.name + "/" + new Date()}`);
    const snapshot = await uploadBytes(imageRef, file);
    return await getDownloadURL(snapshot.ref); // return: url
  };
}

export const storageService = new StorageService();
