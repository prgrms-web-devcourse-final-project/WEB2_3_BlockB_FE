export default function DebateListSkeleton() {
  return (
    <div>
      <div className="block md:hidden">
        {Array.from({ length: 7 }).map((_, index) => (
          <div key={index} className="border-b py-3 px-4 w-full animate-pulse">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="rounded-full w-12 h-12 bg-gray-300"></div>
                <div className="h-4 bg-gray-300 rounded w-24"></div>
              </div>
              <div className="h-4 bg-gray-300 rounded w-32"></div>
            </div>
            <div className="flex justify-between items-center mt-1">
              <div className="h-3 bg-gray-300 rounded w-2/3"></div>
              <div className="flex gap-3">
                <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="hidden md:block">
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
              {Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx} className="flex items-center gap-x-[22px]">
                  <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                  <div className="w-6 h-4 bg-gray-300 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
