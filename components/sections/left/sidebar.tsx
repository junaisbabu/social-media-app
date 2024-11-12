"use client";

import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import {
  House,
  BookMarked,
  SquareUserRound,
  User,
  // Settings,
  AppWindow,
  Bell,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

function Sidebar() {
  const list = [
    { title: "Home", Icon: House, url: "/" },
    { title: "People", Icon: SquareUserRound, url: "/people" },
    { title: "Posts", Icon: AppWindow, url: "/my-posts" },
    { title: "Notifications", Icon: Bell, url: "/notifications" },
    { title: "Saved", Icon: BookMarked, url: "/saved" },
    { title: "Profile", Icon: User, url: "/profile" },
    // { title: "Settings", Icon: Settings, url: "/settings" },
  ];

  const pathname = usePathname();

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-2 md:p-6 bg-white">
        <nav>
          <ul className="flex md:flex-col justify-evenly gap-1 md:gap-0 items-center md:items-start md:justify-start">
            {list.map(({ title, Icon, url }) => (
              <li
                className={cn(
                  "md:border-b-[0.5px] last:border-none md:py-3 last:pb-0 md:first:pt-0 text-[10px] md:text-base md:font-medium w-full",
                  {
                    "text-primary font-semibold": url === pathname,
                    "block lg:hidden": title.match(/notifications/i),
                    "hidden md:block": title.match(/Profile/i),
                  }
                )}
                key={title}
              >
                <Link
                  className="flex flex-col md:flex-row gap-1 md:gap-3 items-center"
                  href={url}
                >
                  <Icon
                    className={cn("text-zinc-400", {
                      "text-primary": url === pathname,
                    })}
                    strokeWidth={url === pathname ? 2.4 : 1.8}
                    size={20}
                  />
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </CardContent>
    </Card>
  );
}

export default Sidebar;
