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
    <div className="w-full h-screen overflow-hidden font-pretendard">
      <div className="max-w-10xl mx-auto p-6 flex flex-col md:flex-row md:pr-0 md:gap-6 h-full overflow-auto">
        <div className="w-full md:w-1/6 md:ml-3 order-1">
          <Category />
        </div>
        <div className="w-full md:w-5/6 overflow-auto md:mr-3 order-2">
          {isLoading ? (
            <NewsDetailSkeleton />
          ) : (
            <>
              {/* 뉴스 본문 (iframe) */}
              <div className="w-full h-[500px] md:h-[650px]  bg-white">
                <iframe
                  src="https://www.yna.co.kr/view/AKR20250217150300001?section=politics/all&site=topnews01"
                  className="w-full h-full border-none"
                  title="News Detail"
                />
              </div>

              {/* 구분선 */}
              <div className="border-t border-gray-300 my-6"></div>

              {/* 좋아요, 북마크, 커넥트 버튼 */}
              <div className="flex flex-col md:flex-row justify-between items-center text-gray-600 text-lg gap-4">
                <div className="flex w-full md:w-auto justify-between md:space-x-6">
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
                <button className="w-full md:w-auto flex items-center rounded-md bg-blue-950 px-4 py-2 text-white justify-center">
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
