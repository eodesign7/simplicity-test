import { useParams } from "react-router";
import type { Route } from "./+types/announcements.$id";
import { Layout } from "../components/main-layout";

// TODO: Implement with Convex backend

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
  // TODO: Implement with Convex backend
  const announcement = null;

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

        <div className="space-y-4">
          <p className="text-neutral-600">
            {isNewAnnouncement
              ? "Create a new announcement with title, content, categories, and publication date."
              : "Edit the existing announcement details."}
          </p>
          <p className="text-sm text-neutral-500">
            TODO: Implement with Convex backend
          </p>
        </div>
      </div>
    </Layout>
  );
}
