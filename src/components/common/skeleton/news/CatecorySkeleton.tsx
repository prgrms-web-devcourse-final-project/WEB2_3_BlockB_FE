export default function CategorySkeleton() {
  return (
    <div className="w-full md:border text-gray-400 rounded-md md:p-4 text-left animate-pulse">
      <div className="bg-gray03 h-6 rounded w-1/3 mb-4"></div>

      {/* PC*/}
      <div className="hidden md:block">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="p-2">
            <div className="bg-gray03 h-5 rounded w-2/3"></div>
          </div>
        ))}
      </div>

      {/* 모바일  */}
      <div className="block md:hidden overflow-x-auto whitespace-nowrap scroll mb-5">
        <div className="flex gap-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="px-4 py-2 bg-gray03 rounded-md h-8 w-24"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
