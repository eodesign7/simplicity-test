import { Link } from "react-router";

// Mock data podľa obrázka - presne ako na obrázku
const mockAnnouncements = [
  {
    id: 1,
    title: "Title 1",
    publicationDate: "Aug 11, 2023 04:38",
    lastUpdate: "Aug 11, 2023",
    categories: "City",
  },
  {
    id: 2,
    title: "Title 2",
    publicationDate: "Aug 11, 2023 04:36",
    lastUpdate: "Aug 11, 2023",
    categories: "City",
  },
  {
    id: 3,
    title: "Title 3",
    publicationDate: "Aug 11, 2023 04:35",
    lastUpdate: "Aug 11, 2023",
    categories: "City",
  },
  {
    id: 4,
    title: "Title 4",
    publicationDate: "Apr 19, 2023 05:14",
    lastUpdate: "Apr 19, 2023",
    categories: "City",
  },
  {
    id: 5,
    title: "Title 5",
    publicationDate: "Apr 19, 2023 05:11",
    lastUpdate: "Apr 19, 2023",
    categories: "City",
  },
  {
    id: 6,
    title: "Title 6",
    publicationDate: "Apr 19, 2023 05:11",
    lastUpdate: "Apr 19, 2023",
    categories: "City",
  },
  {
    id: 7,
    title: "Title 7",
    publicationDate: "Mar 24, 2023 07:27",
    lastUpdate: "Mar 24, 2023",
    categories: "City,Health",
  },
  {
    id: 8,
    title: "Title 8",
    publicationDate: "Mar 24, 2023 07:26",
    lastUpdate: "Mar 24, 2023",
    categories: "City,Health",
  },
  {
    id: 9,
    title: "Title 9",
    publicationDate: "Mar 24, 2023 07:26",
    lastUpdate: "Mar 24, 2023",
    categories: "City,Health",
  },
  {
    id: 10,
    title: "Title 10",
    publicationDate: "Mar 24, 2023 07:26",
    lastUpdate: "Mar 24, 2023",
    categories: "City,Health",
  },
];

export function AnnouncementsTable() {
  return (
    <div className="bg-white p-6">
      <h1 className="text-2xl font-bold text-neutral-900 mb-20">
        Announcements
      </h1>

      <div className="">
        <table className="w-full border-neutral-200 border-y">
          <thead>
            <tr className="border-b border-neutral-300">
              <th className="text-center py-3 px-4 font-bold text-neutral-700">
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
              <th className="text-center py-3 px-4 font-bold text-neutral-700"></th>
            </tr>
          </thead>
          <tbody>
            {mockAnnouncements.map((announcement) => (
              <tr
                key={announcement.id}
                className="border-b border-neutral-300 hover:bg-neutral-50"
              >
                <td className="py-3 px-4 text-neutral-900 text-center">
                  {announcement.title}
                </td>
                <td className="py-3 px-4 text-neutral-600 text-left">
                  {announcement.publicationDate}
                </td>
                <td className="py-3 px-4 text-neutral-600 text-left">
                  {announcement.lastUpdate}
                </td>
                <td className="py-3 px-4 text-neutral-600 text-left">
                  {announcement.categories}
                </td>
                <td className="py-3 px-4">
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
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
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
