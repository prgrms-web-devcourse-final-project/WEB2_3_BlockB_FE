import { useState, useEffect } from "react";
import search from "../assets/icons/search.svg";
import NewsSkeleton from "../components/common/skeleton/news/NewsSkeleton";
import NewsList from "../components/news/NewsList";
import Category from "../components/news/category";
import FilterSearchSkeleton from "../components/common/skeleton/news/FilterSearchSkeleton";
import { newsAPI } from "../api/news";

export default function News() {
  const [status, setStatus] = useState<1 | 2>(1); // 1: 최신순, 2: 인기순
  const [isLoading, setIsLoading] = useState(true);
  const [newsData, setNewsData] = useState<NewsType[]>([]);

  const fetchAllNews = async (sort: string) => {
    try {
      const newsResults = await newsAPI.getAllNews(sort);
      setNewsData(newsResults.data.content);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };
  useEffect(() => {
    fetchAllNews("최신순");
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="w-full h-screen overflow-hidden font-pretendard">
      <div className="flex flex-col h-full p-6 mx-auto overflow-auto max-w-10xl md:flex-row md:pr-0 md:gap-6">
        {/* 카테고리 */}
        <div className="order-1 w-full md:w-1/6 md:ml-3 md:order-1">
          <Category />
        </div>

        <div className="order-2 overflow-auto md:w-5/6 md:mr-3 md:order-2">
          {/* 필터 & 검색 바 */}
          {isLoading ? (
            <FilterSearchSkeleton />
          ) : (
            <>
              <div className="flex space-x-6 text-lg font-semibold">
                <button
                  className={`pb-2 ${
                    status === 1
                      ? "text-black border-b-2 border-black"
                      : "text-gray-400"
                  }`}
                  onClick={() => {
                    setStatus(1);
                    fetchAllNews("최신순");
                  }}
                >
                  최신순
                </button>
                <button
                  className={`pb-2 ${
                    status === 2
                      ? "text-black border-b-2 border-black"
                      : "text-gray-400"
                  }`}
                  onClick={() => {
                    setStatus(2);
                    fetchAllNews("인기순");
                  }}
                >
                  인기순
                </button>
              </div>

              {/* 검색 바 */}
              <div className="relative w-full mt-3">
                <input
                  type="text"
                  className="w-full px-2 py-2 pl-3 pr-10 border rounded-lg focus:outline-none"
                  placeholder="검색..."
                />
                <img
                  src={search}
                  alt="검색 아이콘"
                  className="absolute w-5 h-5 text-gray-500 right-3 top-3"
                />
              </div>
            </>
          )}

          {/* 뉴스 목록 */}
          {isLoading ? <NewsSkeleton /> : <NewsList newsData={newsData} />}
        </div>
      </div>
    </div>
  );
}
