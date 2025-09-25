import { useParams } from "react-router";
import type { Route } from "./+types/announcements.$id";
import { Layout } from "../components/Layout";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Announcement Detail" },
    {
      name: "description",
      content: "Announcement detail page",
    },
  ];
}

export default function AnnouncementDetail() {
  const { id } = useParams();

  return (
    <Layout>
      <div className="bg-white p-6">
        <h1 className="text-2xl font-bold text-neutral-900 mb-6">
          Announcement Detail
        </h1>
        <p className="text-neutral-600 mb-4">
          Detail page for announcement with ID: <strong>{id}</strong>
        </p>
      </div>
    </Layout>
  );
}
