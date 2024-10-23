import PeopleList from "@/components/sections/center/people/people-list";
import React from "react";

function Page() {
  return (
    <div className="h-full w-full rounded-xl pb-14 space-y-4">
      <h1 className="font-medium text-lg">People</h1>
      <PeopleList />
    </div>
  );
}

export default Page;
