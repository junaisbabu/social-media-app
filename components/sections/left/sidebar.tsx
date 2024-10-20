"use client";

import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import {
  House,
  BookMarked,
  SquareUserRound,
  User,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

function Sidebar() {
  const list = [
    { title: "Home", Icon: House, url: "/" },
    { title: "People", Icon: SquareUserRound, url: "/people" },
    { title: "Saved", Icon: BookMarked, url: "/saved" },
    { title: "Profile", Icon: User, url: "/profile" },
    { title: "Settings", Icon: Settings, url: "/settings" },
  ];

  const pathname = usePathname();

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6 bg-white">
        <nav>
          <ul className="flex flex-col">
            {list.map(({ title, Icon, url }) => (
              <li
                className={cn(
                  "border-b-[0.5px] last:border-none py-3 last:pb-0 first:pt-0 font-medium",
                  {
                    "text-primary font-semibold": url === pathname,
                  }
                )}
                key={title}
              >
                <Link className="flex gap-3 items-center" href={url}>
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
