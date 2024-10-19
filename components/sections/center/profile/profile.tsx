"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserType } from "@/type";
import { firestoreService } from "@/firebase/firestore";
import { Collections } from "@/firebase/collections";
import { useAuthStore } from "@/components/auth/auth-state";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useShowToast } from "@/hooks/useShowToast";
import { LoaderCircle } from "lucide-react";
import { getDocs, or, query, where } from "firebase/firestore";

const FormSchema = z.object({
  name: z.string({ required_error: "Name is required" }).min(2, {
    message: "Name must be at least 3 characters",
  }),
  username: z.string({ required_error: "Username is required" }).min(5, {
    message: "Username must be at least 5 characters",
  }),
  email: z.string().email({ message: "Please enter your email address" }),
  phone_no: z
    .string({ required_error: "Phone number is required" })
    .min(10, { message: "Plese enter valid phone number" }),
  location: z.string({ required_error: "Location is required" }),
});

function Profile({ choosedUserId }: { choosedUserId?: string }) {
  const { user: currentUser } = useAuthStore();
  const [user, setUser] = useState<UserType>();
  const [isLoading, setIsLoading] = useState(false);
  const { showSuccessToast, showErrorToast } = useShowToast();
  const [count, setCount] = useState({
    posts: 0,
    isPostsLoading: false,
    friends: 0,
    isFriendsLoading: false,
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    if (!currentUser?.uid) return;
    setIsLoading(true);
    try {
      await firestoreService.setDoc(Collections.USERS, currentUser.uid, {
        ...user,
        ...data,
      });
      showSuccessToast("Profile updated successfully!");
    } catch (error) {
      showErrorToast("Failed to update profile. Please try again.");
      console.error("Error updating profile: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getUser = async () => {
    if (!currentUser?.uid) return;

    const userData = await firestoreService.getDoc(
      Collections.USERS,
      choosedUserId ? choosedUserId : currentUser.uid
    );
    if (userData.exists()) {
      form.reset(userData.data());
      setUser(userData.data() as UserType);
    }
  };

  const getPostsCount = async () => {
    if (!user?.uid) return;

    setCount((prevCount) => ({ ...prevCount, isPostsLoading: true }));

    const postsData = await firestoreService.getDoc(
      Collections.MY_POSTS,
      user.uid
    );

    setCount((prevCount) => ({
      ...prevCount,
      posts: postsData?.data()?.posts.length,
      isPostsLoading: false,
    }));
  };

  const getFriends = async () => {
    if (!user?.uid) return;

    setCount((prevCount) => ({ ...prevCount, isFriendsLoading: true }));

    const friendsRef = firestoreService.getCollectionRef(Collections.FRIENDS);

    const q = query(
      friendsRef,
      or(
        where("from_user_id", "==", user.uid),
        where("to_user_id", "==", user.uid)
      )
    );

    try {
      const querySnapshot = await getDocs(q);

      setCount((prevCount) => ({
        ...prevCount,
        friends: querySnapshot.size,
        isFriendsLoading: false,
      }));
    } catch (error) {
      console.error("Error getFriends: ", error);
    }
  };

  useEffect(() => {
    getUser();
  }, [currentUser]);

  useEffect(() => {
    getPostsCount();
    getFriends();
  }, [user]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6 px-1"
      >
        <h1 className="font-medium">Edit Profile</h1>
        <div className="w-full grid grid-cols-3 place-items-center gap-4">
          <div>
            <h1 className="font-medium text-2xl p-0 m-0 box-content flex gap-1 items-center">
              {count.isPostsLoading ? (
                <LoaderCircle className="animate-spin mx-auto" size={20} />
              ) : (
                count.posts || 0
              )}
              <span className="text-base font-normal">Posts</span>
            </h1>
          </div>
          <Avatar className="w-16 h-16 rounded-xl">
            <AvatarImage
              src={user?.image || "https://github.com/shadcn.png"}
              alt={user?.name || "Anonymous"}
            />
          </Avatar>
          <div className="flex gap-1 items-end">
            <h1 className="font-medium text-2xl p-0 m-0 box-content flex gap-1 items-center">
              {count.isFriendsLoading ? (
                <LoaderCircle className="animate-spin mx-auto" size={20} />
              ) : (
                count.friends || 0
              )}
              <span className="text-base font-normal">Friends</span>
            </h1>
          </div>
        </div>
        <div className="w-full grid grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input readOnly={!!choosedUserId} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input readOnly={!!choosedUserId} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input readOnly={!!choosedUserId} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone_no"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mobile No</FormLabel>
                <FormControl>
                  <Input readOnly={!!choosedUserId} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input readOnly={!!choosedUserId} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {!choosedUserId && (
          <Button className="w-full" type="submit" isLoading={isLoading}>
            Save Changes
          </Button>
        )}
      </form>
    </Form>
  );
}

export default Profile;
