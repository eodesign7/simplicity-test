import type { Route } from "./+types/home";

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
    <main className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Announcements Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Simple and effective announcements management
        </p>
      </div>
    </main>
  );
}
