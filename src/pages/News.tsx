import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";

import { newsAPI } from "../api/news";
import search from "../assets/icons/search.svg";
import NewsList from "../components/news/NewsList";
import Category from "../components/news/category";
import NewsSkeleton from "../components/common/skeleton/news/NewsSkeleton";
import FilterSearchSkeleton from "../components/common/skeleton/news/FilterSearchSkeleton";

export default function News() {
  const [serchParams] = useSearchParams();
  const continentCode = serchParams.get("continent");
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [newsData, setNewsData] = useState<NewsType[]>([]);
  const [cursor, setCursor] = useState<number | null>(null);
  const [currentSearchTerm, setCurrentSearchTerm] = useState("");
  const [currentSort, setCurrentSort] = useState<"LATEST" | "POPULAR">(
    "LATEST"
  );

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      fetchAllNews(currentSort, true, continentCode ?? undefined); // null -> undefined 변환
    }
  };

  const textValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const fetchAllNews = async (
    sort?: "LATEST" | "POPULAR",
    isNewSearch: boolean = false,
    continent?: string
  ) => {
    try {
      let newsResults;
      const actualSort = sort || currentSort;

      // 더 이상 불러올 데이터가 없으면 요청 중단
      if (!isNewSearch && cursor === null) return;

      if (isNewSearch) {
        setCursor(null);
        setCurrentSearchTerm(text);
        setCurrentSort(actualSort);
      }

      const cursorValue = cursor && !isNewSearch ? cursor : undefined;
      const searchTerm = isNewSearch ? text : currentSearchTerm;

      newsResults = await newsAPI.getAllNews(
        actualSort,
        searchTerm,
        cursorValue,
        continent
      );

      if (newsResults.data.content) {
        if (isNewSearch) {
          setNewsData(newsResults.data.content);
        } else {
          setNewsData((prevNews) => [...prevNews, ...newsResults.data.content]);
        }

        //  데이터가 12개 미만이면 cursor를 null로 설정하고 이후 요청 막기
        if (newsResults.data.content.length < 12) {
          setCursor(null);
        } else {
          setCursor(
            newsResults.data.content[newsResults.data.content.length - 1].id
          );
        }
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllNews(currentSort, true, continentCode!);
  }, [continentCode]);

  useEffect(() => {
    fetchAllNews(currentSort, true, continentCode!);
  }, [currentSort]);

  useEffect(() => {
    console.log("❤️ 배포가 잘 반영되는지 테스트");
  }, []);

  return (
    <div className="w-full h-screen overflow-y-hidden font-pretendard">
      <div className="flex flex-col h-full p-6 mx-auto overflow-auto max-w-10xl md:flex-row md:pr-0">
        {/* 카테고리 */}
        <div className="order-1 w-full md:w-1/6 md:ml-3 ">
          <Category />
        </div>

        <div className="order-2 overflow-auto md:w-5/6 md:mr-3 md:ml-6">
          {/* 필터 & 검색 바 */}
          {isLoading ? (
            <FilterSearchSkeleton />
          ) : (
            <>
              <div className="flex space-x-6 text-lg font-semibold">
                <button
                  className={`pb-2 ${
                    currentSort === "LATEST"
                      ? "text-black border-b-2 border-black"
                      : "text-gray-400"
                  }`}
                  onClick={() => {
                    setCurrentSort("LATEST");
                    fetchAllNews("LATEST", true);
                  }}
                >
                  최신순
                </button>
                <button
                  className={`pb-2 ${
                    currentSort === "POPULAR"
                      ? "text-black border-b-2 border-black"
                      : "text-gray-400"
                  }`}
                  onClick={() => {
                    setCurrentSort("POPULAR");
                    fetchAllNews("POPULAR", true);
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
                  onChange={textValueChange}
                  onKeyDown={handleKeyDown}
                />
                <button
                  onClick={() =>
                    fetchAllNews(currentSort, true, continentCode ?? undefined)
                  }
                >
                  <img
                    src={search}
                    alt="검색 아이콘"
                    className="absolute w-5 h-5 text-gray-500 right-3 top-3"
                  />
                </button>
              </div>
            </>
          )}

          {/* 뉴스 목록 */}
          {isLoading ? (
            <NewsSkeleton />
          ) : (
            <NewsList
              newsData={newsData}
              loadMore={() => fetchAllNews(currentSort, false, continentCode!)}
              hasMore={cursor !== null}
            />
          )}
        </div>
      </div>
    </div>
  );
}
