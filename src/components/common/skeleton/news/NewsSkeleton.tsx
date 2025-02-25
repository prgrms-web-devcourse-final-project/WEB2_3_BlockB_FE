export default function NewsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="rounded-lg animate-pulse">
          <div className="w-full h-48 bg-gray03 rounded-lg"></div>
          <div className="mt-3 h-6 bg-gray03 rounded w-3/4"></div>
          <div className="mt-2 h-4 bg-gray03 rounded w-1/2"></div>
          <div className="mt-2 h-4 bg-gray03 rounded w-full"></div>
          <div className="mt-3 flex justify-end items-center text-gray-500 text-sm">
            <div className="flex space-x-3">
              <div className="w-5 h-5 bg-gray03 rounded-full"></div>
              <span className="w-6 h-4 bg-gray03 rounded"></span>
              <div className="w-5 h-5 bg-gray03 rounded-full"></div>
              <span className="w-6 h-4 bg-gray03 rounded"></span>
              <div className="w-5 h-5 bg-gray03 rounded-full"></div>
              <span className="w-6 h-4 bg-gray03 rounded"></span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
