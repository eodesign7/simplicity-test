import type { Route } from "./+types/home";
import { Layout } from "../components/Layout";
import { AnnouncementsTable } from "../components/AnnouncementsTable";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Announcements Dashboard" },
    {
      name: "description",
      content: "Simple announcements management dashboard",
    },
  ];
}

export default function Home() {
  return (
    <Layout>
      <AnnouncementsTable />
    </Layout>
  );
}
