"use client";

import { auth, googleAuthProvider } from "@/firebase/firebase";
import {
  signInWithPopup,
  GoogleAuthProvider,
  getAdditionalUserInfo,
  User,
} from "firebase/auth";
import { Button } from "../ui/button";
import GoogleLogo from "@/public/assets/google.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { firestoreService } from "@/firebase/firestore";
import { Collections } from "@/firebase/collections";
import { getUsername } from "@/utils/get-username";
import { useShowToast } from "@/hooks/useShowToast";
import Cookies from "js-cookie";

const SignIn = () => {
  const router = useRouter();

  const { showErrorToast } = useShowToast();

  const handleNewUser = async (user: User) => {
    const { displayName, email, phoneNumber, photoURL, uid } = user;
    const userData = {
      uid,
      email,
      name: displayName,
      phone_no: phoneNumber || "",
      image: photoURL,
      username: getUsername(displayName, uid),
    };

    firestoreService.setDoc(Collections.USERS, uid, userData);
  };

  // Handle user sign up with google
  const handleGoogleSignUp = async (e: any) => {
    e.preventDefault();

    signInWithPopup(auth, googleAuthProvider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;

        const isNewUser = getAdditionalUserInfo(result)?.isNewUser;

        if (isNewUser) {
          handleNewUser(user);
        }

        if (token) {
          Cookies.set("userToken", token);
        }
        router.push("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        const email = error.customData.email;

        switch (errorCode) {
          case "auth/operation-not-allowed":
            showErrorToast("Email/password accounts are not enabled.");
            break;
          case "auth/operation-not-supported-in-this-environment":
            showErrorToast("HTTP protocol is not supported. Please use HTTPS.");
            break;
          case "auth/popup-blocked":
            showErrorToast(
              "Popup has been blocked by the browser. Please allow popups for this website."
            );
            break;
          case "auth/popup-closed-by-user":
            showErrorToast(
              "Popup has been closed by the user before finalizing the operation. Please try again."
            );
            break;
          default:
            showErrorToast(errorMessage);
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
