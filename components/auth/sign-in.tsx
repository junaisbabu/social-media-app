"use client";

import { auth, googleAuthProvider } from "@/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Button } from "../ui/button";
import GoogleLogo from "@/public/assets/google.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";

const SignIn = () => {
  const router = useRouter();

  const { toast } = useToast();

  const showToast = (description: string) => {
    toast({
      variant: "destructive",
      title: "Error",
      description,
    });
  };

  // Handle user sign up with google
  const handleGoogleSignUp = async (e: any) => {
    e.preventDefault();

    signInWithPopup(auth, googleAuthProvider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;

        router.push("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        const email = error.customData.email;

        switch (errorCode) {
          case "auth/operation-not-allowed":
            showToast("Email/password accounts are not enabled.");
            break;
          case "auth/operation-not-supported-in-this-environment":
            showToast("HTTP protocol is not supported. Please use HTTPS.");
            break;
          case "auth/popup-blocked":
            showToast(
              "Popup has been blocked by the browser. Please allow popups for this website."
            );
            break;
          case "auth/popup-closed-by-user":
            showToast(
              "Popup has been closed by the user before finalizing the operation. Please try again."
            );
            break;
          default:
            showToast(errorMessage);
            break;
        }
      });
  };

  return (
    <div className="signupContainer">
      <div className="signupContainer__box__google">
        <Button className="space-x-2" onClick={handleGoogleSignUp}>
          <Image src={GoogleLogo} alt="google" width={24} height={24} />
          <span>Continue with Google</span>
        </Button>
      </div>
    </div>
  );
};

export default SignIn;
