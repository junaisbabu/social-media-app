import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { House, Image, SquareUserRound, User, Settings } from "lucide-react";
import Link from "next/link";

function Sidebar() {
  const list = [
    { title: "Home", Icon: House, url: "/" },
    { title: "People", Icon: SquareUserRound, url: "/people" },
    { title: "Photos", Icon: Image, url: "/photos" },
    { title: "Profile", Icon: User, url: "/profile" },
    { title: "Settings", Icon: Settings, url: "/settings" },
  ];

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6 bg-white">
        <nav>
          <ul className="flex flex-col">
            {list.map(({ title, Icon, url }) => (
              <li
                className="border-b-[0.5px] last:border-none py-3 last:pb-0 first:pt-0 font-medium"
                key={title}
              >
                <Link className="flex gap-3 items-center" href={url}>
                  <Icon className="text-zinc-400" strokeWidth={1.8} size={20} />
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
