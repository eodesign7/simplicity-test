import type { Route } from "./+types/home";
import { Layout } from "../components/Layout";

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
      <div className="bg-white p-6 w-full max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-neutral-900 mb-8">
          Welcome to Announcements Dashboard
        </h1>

        <div className="space-y-6">
          <div className="bg-light-yellow p-6 rounded-lg">
            <h2 className="text-xl font-bold text-neutral-900 mb-4">
              🎯 Testovacie zadanie
            </h2>
            <p className="text-neutral-700 leading-relaxed">
              Tento dashboard je jednoduchý systém pre správu oznamov, ktorý
              obsahuje:
            </p>
            <ul className="mt-4 space-y-2 text-neutral-700">
              <li>
                • <strong>Tabuľku oznamov</strong> zoradenú podľa Last Update
              </li>
              <li>
                • <strong>Detail/edit view</strong> pre konkrétny oznam
              </li>
              <li>
                • <strong>Formulár na úpravu</strong> oznamu s validáciou
              </li>
              <li>
                • <strong>Multiselect kategórie</strong> s custom dropdown
              </li>
              <li>
                • <strong>Toast notifikácie</strong> pre feedback
              </li>
            </ul>
          </div>

          <div className="bg-light-gray p-6 rounded-lg">
            <h2 className="text-xl font-bold text-neutral-900 mb-4">
              🛠 Tech Stack
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-neutral-700">
              <div>
                <h3 className="font-semibold mb-2">Frontend:</h3>
                <ul className="space-y-1">
                  <li>• React + Vite</li>
                  <li>• TypeScript</li>
                  <li>• TailwindCSS</li>
                  <li>• React Router</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Libraries:</h3>
                <ul className="space-y-1">
                  <li>• react-hook-form</li>
                  <li>• Zod validation</li>
                  <li>• react-hot-toast</li>
                  <li>• pnpm package manager</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center">
            <a
              href="/announcements"
              className="inline-flex items-center px-6 py-3 bg-primary text-neutral-900 font-semibold rounded-full hover:bg-primary/90 transition-colors"
            >
              Prejsť na oznamy →
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
