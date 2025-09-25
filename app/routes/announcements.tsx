import type { Route } from "./+types/announcements";
import { Layout } from "../components/Layout";
import { AnnouncementsTable } from "../components/AnnouncementsTable";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Announcements" },
    {
      name: "description",
      content: "Announcements list page",
    },
  ];
}

export default function Announcements() {
  return (
    <Layout>
      <AnnouncementsTable />
    </Layout>
  );
}
