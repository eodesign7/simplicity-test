import { IconChartBar, IconFolder, IconUsers } from "@tabler/icons-react";
import { HomeIcon, MegaphoneIcon } from "lucide-react";

export const sidebarData = {
  user: {
    name: "Erik Ondruš",
    email: "erik@eodev.io",
    avatar: "/eo.jpg", // TODO: Replace with logo
  },
  navMain: [
    {
      title: "Home",
      url: "/",
      icon: HomeIcon,
      disabled: false,
    },
    {
      title: "Announcements",
      url: "/announcements",
      icon: MegaphoneIcon,
      disabled: false,
    },
    {
      title: "Analytics",
      url: "#",
      icon: IconChartBar,
      disabled: true,
    },
    {
      title: "Projects",
      url: "#",
      icon: IconFolder,
      disabled: true,
    },
    {
      title: "Team",
      url: "#",
      icon: IconUsers,
      disabled: true,
    },
  ],
  disabled: true, // Global disabled state for last 3 routes
};
