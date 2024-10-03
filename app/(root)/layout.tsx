import Header from "@/components/header";
import LeftSection from "@/components/sections/left/left";
import RightSection from "@/components/sections/right/right";
import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full flex flex-col">
      <Header />
      <div className="w-full h-[calc(0px-100dvh)] grid grid-cols-4 shrink-0 flex-1 gap-6 p-6 pb-0">
        <LeftSection />
        <div className="col-span-2 no-scrollbar overflow-y-auto flex-1 h-full">
          {children}
        </div>
        <RightSection />
      </div>
    </div>
  );
}

export default Layout;