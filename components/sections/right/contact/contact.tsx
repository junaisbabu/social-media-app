"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { UserType } from "@/type";
import React from "react";
import ContactActions from "./contact-actions";

function Contact({ contact }: { contact: UserType }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Avatar className="w-9 h-9 rounded-xl">
          <AvatarImage src={contact.image} alt={contact.name} />
        </Avatar>
        <span className="font-medium">{contact.name}</span>
      </div>
      <ContactActions />
    </div>
  );
}

export default Contact;
