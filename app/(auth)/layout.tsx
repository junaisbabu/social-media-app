import Image from "next/image";
import React from "react";
import AuthenticationCuate from "../../public/assets/authentication-cuate.svg";
import AuthState from "@/components/auth/auth-state";

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthState />
      <div className="min-w-full min-h-screen flex flex-row gap-4 items-center justify-evenly">
        <Image src={AuthenticationCuate} alt="Authentication" />
        <div className="max-w-xl">{children}</div>
      </div>
    </>
  );
}

export default AuthLayout;
