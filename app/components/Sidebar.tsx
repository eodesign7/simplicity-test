import { Link, useLocation } from "react-router";

export function Sidebar() {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <aside className="w-64 bg-light-gray h-full">
      {/* Sidebar header */}
      <div className="p-4 flex items-center gap-2">
        <Link
          to="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <img
            src="/logo.png"
            alt="Test city"
            className="w-10 h-10 rounded-xl border-1 border-gray-300"
          />
          <h1 className="text-xl font-black text-neutral-900">Test city</h1>
        </Link>
      </div>

      {/* Sidebar navigation */}
      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <Link
              to="/announcements"
              className={`flex items-center px-3 py-2 rounded-lg transition-colors font-bold ${
                pathname === "/announcements" ||
                pathname.startsWith("/announcements/")
                  ? "bg-light-yellow text-neutral-900"
                  : "text-neutral-600 hover:bg-light-yellow/50"
              }`}
            >
              {/* Speaker ikona */}
              <img
                src="/megaphone.png"
                alt="Megaphone"
                className="w-4 h-4 mr-4"
              />
              Announcements
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
