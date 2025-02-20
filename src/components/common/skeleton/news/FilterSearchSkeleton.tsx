export default function FilterSearchSkeleton() {
  return (
    <div className="animate-pulse">
      {/* 필터 버튼 스켈레톤 */}
      <div className="flex space-x-6 text-lg font-semibold">
        <div className="h-8 w-24 bg-gray-300 rounded"></div>
        <div className="h-8 w-24 bg-gray-300 rounded"></div>
      </div>

      {/* 검색 바 스켈레톤 */}
      <div className="relative mt-3 w-full">
        <div className="h-10 bg-gray-300 rounded-lg w-full"></div>
      </div>
    </div>
  );
}
