interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div className={`animate-pulse bg-neutral-200 rounded ${className}`} />
  );
}

export function TableSkeleton() {
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
            {Array.from({ length: 5 }).map((_, index) => (
              <tr key={index} className="border-b border-neutral-300">
                <td className="py-3 pl-12 pr-4">
                  <Skeleton className="h-4 w-48" />
                </td>
                <td className="py-3 px-4">
                  <Skeleton className="h-4 w-24" />
                </td>
                <td className="py-3 px-4">
                  <Skeleton className="h-4 w-20" />
                </td>
                <td className="py-3 px-4">
                  <Skeleton className="h-4 w-32" />
                </td>
                <td className="py-3 pl-4 pr-2">
                  <Skeleton className="h-5 w-5" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
