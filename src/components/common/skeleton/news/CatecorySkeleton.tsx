export default function CategorySkeleton() {
  return (
    <div className="w-full border text-gray-400 rounded-md p-4 text-left animate-pulse">
      <div className="bg-gray03 h-6 rounded w-1/3 mb-4"></div>
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="p-2">
          <div className="bg-gray03 h-5 rounded w-2/3"></div>
        </div>
      ))}
    </div>
  );
}
