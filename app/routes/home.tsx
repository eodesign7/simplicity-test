import type { Route } from "./+types/home";
import { Layout } from "@/components/main-layout";

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
      <div className="p-8 flex flex-col gap-8">
        {/* Header */}
        <div className="text-left">
          <h1 className="text-4xl font-black text-gray-900 mb-4">
            Test Assignment 🚀
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Evolúcia jednoduchého dashboard-u - od základnej verzie po rozšírenú
            s modernými komponentmi.
          </p>
        </div>

        {/* Project Phases */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Phase 1 */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">✅</span>
              <h2 className="text-xl font-bold text-green-800">
                Phase 1: One-to-One (COMPLETED)
              </h2>
            </div>
            <p className="text-green-700 mb-4">
              Striktne podľa testovacieho zadania:
            </p>
            <ul className="space-y-2 text-sm text-green-600">
              <li>• Tabuľka oznamov s Convex backend</li>
              <li>• Form validácia s Zod</li>
              <li>• Convex backend perzistencia</li>
              <li>• Custom UI komponenty</li>
              <li>• Toast notifikácie</li>
            </ul>
          </div>

          {/* Phase 2 */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🚀</span>
              <h2 className="text-xl font-bold text-blue-800">
                Phase 2: Enhanced (IN PROGRESS)
              </h2>
            </div>
            <p className="text-blue-700 mb-4">
              Rozšírená verzia s modernými komponentmi:
            </p>
            <ul className="space-y-2 text-sm text-blue-600">
              <li>• Shadcn/ui komponenty</li>
              <li>• Convex backend (real-time)</li>
              <li>• Plnohodnotné CRUD operácie</li>
              <li>• Header s search funkcionalitou</li>
              <li>• Filter & Sorting v tabuľke</li>
              <li>• Rozšírený Sidebar s linkmi</li>
            </ul>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">🛠 Tech Stack</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">
                Current (One-to-One)
              </h3>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• React + Vite + TypeScript</li>
                <li>• TailwindCSS + React Router</li>
                <li>• react-hook-form + Zod + react-hot-toast</li>
                <li>• Convex (real-time backend)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">
                Enhanced (Phase 2)
              </h3>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Shadcn/ui (moderné komponenty)</li>
                <li>• Convex (real-time backend)</li>
                <li>• TanStack Query (server state)</li>
                <li>• Lucide React (ikony)</li>
                <li>• React Hook Form + Zod (formuláre)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Functionality */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-yellow-800 mb-4">
            🎯 Funkcionalita
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-yellow-700 mb-2">
                Current: Basic CRUD
              </h3>
              <ul className="space-y-1 text-sm text-yellow-600">
                <li>• CREATE - vytvorenie nového oznamu</li>
                <li>• READ - zobrazenie zoznamu oznamov</li>
                <li>• UPDATE - NIE (podľa zadania len CREATE)</li>
                <li>• DELETE - NIE (podľa zadania len CREATE)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-yellow-700 mb-2">
                Enhanced: Full CRUD
              </h3>
              <ul className="space-y-1 text-sm text-yellow-600">
                <li>• CREATE - vytvorenie nového oznamu</li>
                <li>• READ - zobrazenie s filtrami a sortovaním</li>
                <li>• UPDATE - úprava existujúcich záznamov</li>
                <li>• DELETE - mazanie s confirmation dialógom</li>
                <li>• BULK - hromadné operácie</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Live Demo Links */}
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-purple-800 mb-4">
            🌐 Live Demo
          </h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://simplicity-test.onrender.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <span>One-to-One Version</span>
              <span>→</span>
            </a>
            <a
              href="https://github.com/eodesign7/simplicity-test"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <span>Source Code</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
