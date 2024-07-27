"use client";

import { useAuthStore } from "@/components/auth/auth-state";
import { Button } from "@/components/ui/button";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";

export default function Home() {
  const { user } = useAuthStore();

  return (
    <main className="min-h-screen">
      User ID : {user?.uid}
      <Button onClick={() => signOut(auth)}>Sign Out</Button>
    </main>
  );
}
