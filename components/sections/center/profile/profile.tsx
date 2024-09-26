"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
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

function Profile() {
  const { user: currentUser } = useAuthStore();
  const [user, setUser] = useState<UserType>();
  const [isLoading, setIsLoading] = useState(false);

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
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getUser = async () => {
    if (!currentUser?.uid) return;

    const userData = await firestoreService.getDoc(
      Collections.USERS,
      currentUser.uid
    );
    if (userData.exists()) {
      form.reset(userData.data());
      setUser(userData.data() as UserType);
    }
  };

  useEffect(() => {
    getUser();
  }, [currentUser]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6 px-1"
      >
        <h1 className="font-medium">Edit Profile</h1>
        <div className="w-full flex items-baseline justify-evenly gap-4">
          <div className="flex gap-1 items-end">
            <h1 className="font-medium text-2xl p-0 m-0 box-content">
              111K <span className="text-base font-normal">Posts</span>
            </h1>
          </div>
          <Avatar className="w-16 h-16 rounded-xl">
            <AvatarImage
              src={user?.image || "https://github.com/shadcn.png"}
              alt={user?.name || "Anonymous"}
            />
          </Avatar>
          <div className="flex gap-1 items-end">
            <h1 className="font-medium text-2xl">
              111K <span className="text-base font-normal">Friends</span>
            </h1>
          </div>
        </div>
        <div className="w-full grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Full Name" {...field} />
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
                <FormControl>
                  <Input placeholder="Username" {...field} />
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
                <FormControl>
                  <Input placeholder="Email" readOnly {...field} />
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
                <FormControl>
                  <Input placeholder="Phone Number" {...field} />
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
                <FormControl>
                  <Input placeholder="Location" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button className="w-full" type="submit" isLoading={isLoading}>
          Save Changes
        </Button>
      </form>
    </Form>
  );
}

export default Profile;
