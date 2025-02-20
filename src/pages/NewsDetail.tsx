import { useState, useEffect } from "react";
import Category from "../components/news/category";
import bookmark from "../assets/icons/bookmark.svg";
import connection from "../assets/icons/connection.svg";
import like from "../assets/icons/like.svg";
import speechBubble from "../assets/icons/speechBubble.svg";
import NewsDetailSkeleton from "../components/common/skeleton/news/NewsDetailSkeleton";

export default function NewsDetail() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  return (
    <div className="w-full">
      <div className="max-w-10xl mx-auto p-6 pr-0 flex gap-12">
        <div className="w-1/6 ml-3">
          <Category />
        </div>
        <div className="w-5/6 font-pretendard">
          {isLoading ? (
            <NewsDetailSkeleton />
          ) : (
            <>
              {/* 뉴스 본문 (iframe) */}
              <div className="w-full h-[650px] bg-white pr-0">
                <iframe
                  src="https://www.yna.co.kr/view/AKR20250217150300001?section=politics/all&site=topnews01"
                  className="w-full h-full border-none"
                  title="News Detail"
                />
              </div>

              {/* 구분선 */}
              <div className="border-t border-gray-300 my-6"></div>

              {/* 좋아요, 북마크, 커넥트 버튼 */}
              <div className="flex justify-between items-center text-gray-600 text-lg">
                <div className="flex space-x-6">
                  <button className="flex items-center space-x-2">
                    <img src={like} alt="좋아요" className="w-6 h-6" />
                    <span className="text-base w-8 text-center">123</span>
                  </button>
                  <button className="flex items-center space-x-2">
                    <img src={bookmark} alt="북마크" className="w-6 h-6" />
                    <span className="text-base w-8 text-center">12</span>
                  </button>
                  <button className="flex items-center space-x-2">
                    <img src={connection} alt="커넥트" className="w-6 h-6" />
                    <span className="text-base w-8 text-center">12</span>
                  </button>
                </div>

                {/* 토론방 */}
                <button className="flex items-center rounded-md bg-blue-950 px-4 py-2 mr-5 text-white">
                  토론방 개설
                  <span className="ml-2">
                    <img
                      src={speechBubble}
                      alt="말풍선"
                      className="w-5 h-5 mx-1"
                    />
                  </span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
