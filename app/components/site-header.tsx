import { Github, Globe, Globe2 } from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { SidebarTrigger } from "./ui/sidebar";
import { useLocation } from "react-router";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import { ThemeToggle } from "./ThemeToggle";

export function SiteHeader({ title }: { title: string }) {
  const location = useLocation();

  // Check if we're on an announcement detail page
  const announcementMatch = location.pathname.match(
    /^\/announcements\/([^\/]+)$/
  );
  const announcementId = announcementMatch?.[1];
  const isAnnouncementDetail = announcementId && announcementId !== "new";

  // Fetch announcement data if we're on a detail page
  const announcement = useQuery(
    api.announcements.getById,
    isAnnouncementDetail
      ? { id: announcementId as Id<"announcements"> }
      : "skip"
  );

  // Determine the display title
  const displayTitle =
    isAnnouncementDetail && announcement
      ? announcement.title
      : title === announcementId && isAnnouncementDetail
      ? "Loading..."
      : title;

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-bold capitalize">{displayTitle}</h1>
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" asChild size="sm" className="hidden sm:flex">
            <a
              href="https://eodev.io"
              rel="noopener noreferrer"
              target="_blank"
              className="dark:text-foreground"
            >
              <Globe />
            </a>
          </Button>
          <Button variant="ghost" asChild size="sm" className="hidden sm:flex">
            <a
              href="https://github.com/eodesign7/simplicity-test"
              rel="noopener noreferrer"
              target="_blank"
              className="dark:text-foreground"
            >
              <Github />
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
