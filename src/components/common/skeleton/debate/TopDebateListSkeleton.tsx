export default function TopDebateListSkeleton() {
  return (
    <div>
      <h2 className="text-center text-xl font-bold mt-[14px] mb-4">
        Top debaters
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 animate-pulse">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg border border-gray-200 shadow-xl text-center"
          >
            <div className="relative inline-block">
              <div className="rounded-full w-20 h-20 bg-gray-300 mx-auto"></div>
            </div>
            <div className="h-4 bg-gray-300 rounded w-24 mx-auto mt-2"></div>
            <div className="h-3 bg-gray-300 rounded w-32 mx-auto mt-1"></div>
            <div className="h-6 bg-gray-300 rounded-lg w-40 mx-auto mt-6 mb-10"></div>
            <div className="flex w-full justify-between items-center mt-3">
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
    </div>
  );
}
