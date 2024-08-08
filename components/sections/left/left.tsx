import React from "react";
import MyInfo from "./my-info";
import Sidebar from "./sidebar";

function LeftSection() {
  return (
    <div className="w-3/12 min-h-full rounded-xl overflow-hidden space-y-5">
      <MyInfo />
      <Sidebar />
    </div>
  );
}

export default LeftSection;
