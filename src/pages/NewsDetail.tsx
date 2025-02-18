import Category from "../components/news/category";

import search from "../assets/icons/search.svg";

export default function NewsDetail() {
  return (
    <div className="w-full">
      <div className="max-w-10xl mx-auto p-6 pr-0 flex gap-12">
        {/* 카테고리 필터 */}
        <div className="w-1/6 ml-3 ">
          <Category />
        </div>
        {/* 뉴스 본문 (iframe) */}
        <div className="w-5/6">
          <div className="w-full h-[650px] bg-white  pr-0">
            <iframe
              src="https://www.yna.co.kr/view/AKR20250217150300001?section=politics/all&site=topnews01"
              className="w-full h-full border-none "
              title="News Detail"
            />
          </div>

          {/* 구분선 */}
          <div className="border-t border-gray-300 my-6"></div>

          {/* 좋아요, 북마크, 댓글 버튼 */}
          <div className="flex justify-between items-center text-gray-600 text-lg">
            <div className="flex space-x-6">
              {/* 좋아요 */}
              <button className="flex items-center space-x-2">
                <img
                  src={search}
                  alt="검색 아이콘"
                  className="w-6 h-6 text-gray-600"
                />

                <span>123</span>
              </button>

              {/* 북마크 */}
              <button className="flex items-center space-x-2">
                <img
                  src={search}
                  alt="검색 아이콘"
                  className="w-6 h-6 text-gray-600"
                />
                <span>12</span>
              </button>
            </div>

            {/* 토론방 */}
            <button className="rounded-md bg-blue-950 px-4 py-2 mr-5 text-white  ">
              토론방 개설
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
