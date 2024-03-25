import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { ClerkLoading, ClerkLoaded, UserButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";

import { SidebarItem } from "./sidebar-item";

type Props = {
  className?: string;
};

export const Sidebar = ({ className }: Props) => {
  return (
    <div
      className={cn(
        "flex flex-col h-full lg:w-[256px] lg:fixed left-0 px-4 border-r-2",
        className
      )}
    >
      <Link href="/learn">
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
          <Image src={"/mascot.svg"} width={40} height={40} alt="Lingo Logo" />

          <h1 className="text-2xl font-extrabold text-green-600 tracking-wide">
            Lingo
          </h1>
        </div>
      </Link>

      <div className="flex flex-col gap-y-2 flex-1">
        <SidebarItem
          label="Learn"
          href="/learn"
          iconSrc="/learn.svg"
          iconSize={32}
        />
        <SidebarItem
          label="Leaderboard"
          href="/leaderboard"
          iconSrc="/leaderboard.svg"
          iconSize={32}
        />
        <SidebarItem
          label="Quests"
          href="/quests"
          iconSrc="/quests.svg"
          iconSize={32}
        />
        <SidebarItem
          label="Shop"
          href="/shop"
          iconSrc="/shop.svg"
          iconSize={32}
        />
        <SidebarItem
          label="Badges"
          href="/badges"
          iconSrc="/badges.png"
          iconSize={26}
        />
        <SidebarItem
          label="Leagues"
          href="/leagues"
          iconSrc="/leagues.png"
          iconSize={26}
        />
      </div>

      <div className="p-4">
        <ClerkLoading>
          <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
        </ClerkLoading>
        <ClerkLoaded>
          <UserButton afterSignOutUrl="/" />
        </ClerkLoaded>
      </div>
    </div>
  );
};
