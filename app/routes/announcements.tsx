import type { Route } from "./+types/announcements";
import { Layout } from "../components/Layout";

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
      <div className="bg-white p-6">
        <h1 className="text-2xl font-bold text-black mb-6">
          Announcements Page
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          List of all announcements will be displayed here
        </p>
      </div>
    </Layout>
  );
}
