// Mock data podľa obrázka
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
    publicationDate: "Apr 19, 2023 05:14",
    lastUpdate: "Apr 19, 2023",
    categories: "City,Health",
  },
  {
    id: 3,
    title: "Title 3",
    publicationDate: "Mar 24, 2023 07:27",
    lastUpdate: "Mar 24, 2023",
    categories: "City",
  },
  {
    id: 4,
    title: "Title 4",
    publicationDate: "Feb 15, 2023 09:45",
    lastUpdate: "Feb 15, 2023",
    categories: "Health",
  },
  {
    id: 5,
    title: "Title 5",
    publicationDate: "Jan 8, 2023 11:20",
    lastUpdate: "Jan 8, 2023",
    categories: "City,Health",
  },
  {
    id: 6,
    title: "Title 6",
    publicationDate: "Dec 22, 2022 14:15",
    lastUpdate: "Dec 22, 2022",
    categories: "City",
  },
  {
    id: 7,
    title: "Title 7",
    publicationDate: "Nov 30, 2022 16:30",
    lastUpdate: "Nov 30, 2022",
    categories: "Health",
  },
  {
    id: 8,
    title: "Title 8",
    publicationDate: "Oct 12, 2022 08:45",
    lastUpdate: "Oct 12, 2022",
    categories: "City",
  },
  {
    id: 9,
    title: "Title 9",
    publicationDate: "Sep 5, 2022 13:20",
    lastUpdate: "Sep 5, 2022",
    categories: "City,Health",
  },
  {
    id: 10,
    title: "Title 10",
    publicationDate: "Aug 18, 2022 10:15",
    lastUpdate: "Aug 18, 2022",
    categories: "City",
  },
];

export function AnnouncementsTable() {
  return (
    <div className="bg-white p-6">
      <h1 className="text-2xl font-bold text-black mb-6">Announcements</h1>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="text-left py-3 px-4 font-medium text-gray-700">
                Title
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">
                Publication date
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">
                Last update
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">
                Categories
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-700"></th>
            </tr>
          </thead>
          <tbody>
            {mockAnnouncements.map((announcement) => (
              <tr
                key={announcement.id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="py-3 px-4 text-gray-900">
                  {announcement.title}
                </td>
                <td className="py-3 px-4 text-gray-600">
                  {announcement.publicationDate}
                </td>
                <td className="py-3 px-4 text-gray-600">
                  {announcement.lastUpdate}
                </td>
                <td className="py-3 px-4 text-gray-600">
                  {announcement.categories}
                </td>
                <td className="py-3 px-4">
                  {/* Edit ikona - pencil */}
                  <button
                    className="text-gray-500 hover:text-gray-700"
                    title="Edit announcement"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
