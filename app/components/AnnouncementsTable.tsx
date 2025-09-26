import { Link } from "react-router";


export function AnnouncementsTable() {
  // TODO: Implement with Convex backend
  const announcements: any[] = [];
  const isLoading = false;

  return (
    <div className="bg-white p-6">
      <div className="flex justify-start items-center mb-20">
        <h1 className="text-2xl font-bold text-neutral-900">Announcements</h1>
      </div>

      <div className="">
        <table className="w-full border-neutral-200 border-y">
          <thead>
            <tr className="border-b border-neutral-300">
              <th className="text-left py-3 pl-12 pr-4 font-bold text-neutral-700">
                Title
              </th>
              <th className="text-left py-3 px-4 font-bold text-neutral-700">
                Publication date
              </th>
              <th className="text-left py-3 px-4 font-bold text-neutral-700">
                Last update
              </th>
              <th className="text-left py-3 px-4 font-bold text-neutral-700">
                Categories
              </th>
              <th className="text-left py-3 px-4 font-bold text-neutral-700"></th>
            </tr>
          </thead>
          <tbody>
            {announcements.map((announcement, index) => (
              <tr
                key={index}
                className="border-b border-neutral-300 hover:bg-neutral-50"
              >
                <td className="py-3 pl-12 pr-4 text-neutral-900 text-left">
                  {announcement.title}
                </td>
                <td className="py-3 px-4 text-neutral-600 text-left">
                  {announcement.publicationDate}
                </td>
                <td className="py-3 px-4 text-neutral-600 text-left">
                  {announcement.lastUpdate}
                </td>
                <td className="py-3 px-4 text-neutral-600 text-left">
                  {announcement.categories.join(", ")}
                </td>
                <td className="py-3 pl-4 pr-2">
                  <Link
                    to={`/announcements/${announcement.id}`}
                    className="text-neutral-500 hover:text-neutral-700 transition-colors"
                    title="Edit announcement"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                      <path d="m15 5 4 4" />
                    </svg>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
