"use client";

import React from "react";
import MyInfo from "./my-info";
import Sidebar from "./sidebar";

function LeftSection() {
  return (
    <div className="w-full min-h-full rounded-xl overflow-hidden space-y-5 hidden md:block">
      <MyInfo />
      <Sidebar />
    </div>
  );
}

export default LeftSection;
