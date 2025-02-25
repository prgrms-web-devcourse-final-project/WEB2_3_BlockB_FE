export default function NewsDetailSkeleton() {
  return (
    <div className="w-full animate-pulse">
      {/* 뉴스 본문 (iframe) 스켈레톤 */}
      <div className="w-full h-[650px] bg-gray03 "></div>

      {/* 구분선 */}
      <div className="border-t border-gray03 my-6"></div>

      {/* 좋아요, 북마크, 커넥트트 버튼 스켈레톤 */}
      <div className="flex justify-between items-center text-lg">
        <div className="flex space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gray03 rounded-full"></div>
            <div className="w-6 h-4 bg-gray03 rounded"></div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gray03 rounded-full"></div>
            <div className="w-6 h-4 bg-gray03 rounded"></div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gray03 rounded-full"></div>
            <div className="w-6 h-4 bg-gray03 rounded"></div>
          </div>
        </div>

        {/* 토론방 버튼 스켈레톤 */}
        <div className="w-32 h-10 px-4 py-2 mr-5 bg-gray03 rounded-md"></div>
      </div>
    </div>
  );
}
