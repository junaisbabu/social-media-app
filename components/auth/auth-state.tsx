"use client";

import { auth } from "@/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { create } from "zustand";

type UserType = User | null;

interface AuthState {
  user: UserType;
  setUser: (user: UserType) => void;
}

const useStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

function AuthState() {
  const router = useRouter();

  const { setUser } = useStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Updates the user state when the user logs in
      if (user) {
        setUser(user);
      } else {
        router.push("/sign-in");
        setUser(null);
      }
    });

    // cleanup
    return () => unsubscribe();
  }, [auth]);

  return null;
}

export default AuthState;

export { useStore };
