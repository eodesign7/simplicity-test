import { useParams } from "react-router";
import type { Route } from "./+types/announcements.$id";
import { Layout } from "../components/Layout";
import { AnnouncementForm } from "../components/AnnouncementForm";
import { getAnnouncementById } from "../../lib/storage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Edit Announcement" },
    {
      name: "description",
      content: "Edit announcement page",
    },
  ];
}

export default function AnnouncementDetail() {
  const { id } = useParams();
  const isNewAnnouncement = !id || id === "new";
  const announcement = id ? getAnnouncementById(id) : null;

  if (!isNewAnnouncement && !announcement) {
    return (
      <Layout>
        <div className="bg-white p-6 w-full max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold text-neutral-900 mb-6">
            Announcement not found
          </h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-white p-6 w-full max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-neutral-900 mb-8">
          {isNewAnnouncement
            ? "Create new announcement"
            : "Edit the announcement"}
        </h1>

        <AnnouncementForm id={id} />
      </div>
    </Layout>
  );
}
