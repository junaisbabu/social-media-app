import Profile from "@/components/sections/center/profile/profile";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

function Page(props: Props) {
  return <Profile choosedUserId={props.params.id} />;
}

export default Page;
