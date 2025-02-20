export default function DebateListSkeleton() {
  return (
    <div>
      {Array.from({ length: 7 }).map((_, index) => (
        <div
          key={index}
          className="flex items-center justify-between border-b py-3 animate-pulse"
        >
          <div className="flex items-center gap-4 w-1/3">
            <div className="rounded-full w-12 h-12 bg-gray-300"></div>
            <div>
              <div className="h-4 bg-gray-300 rounded w-24 mb-1"></div>
              <div className="h-3 bg-gray-300 rounded w-32"></div>
            </div>
          </div>
          <div className="w-1/3 flex justify-center">
            <div className="h-6 bg-gray-300 rounded-lg w-40"></div>
          </div>
          <div className="w-1/3 flex justify-end gap-6">
            <div className="flex items-center gap-x-[22px]">
              <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
              <div className="w-6 h-4 bg-gray-300 rounded"></div>
            </div>
            <div className="flex items-center gap-x-[22px]">
              <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
              <div className="w-6 h-4 bg-gray-300 rounded"></div>
            </div>
            <div className="flex items-center gap-x-[22px]">
              <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
              <div className="w-6 h-4 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
