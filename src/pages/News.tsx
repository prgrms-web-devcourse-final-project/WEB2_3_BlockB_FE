import { useState, useEffect, useRef } from "react";
import search from "../assets/icons/search.svg";
import NewsSkeleton from "../components/common/skeleton/news/NewsSkeleton";
import NewsList from "../components/news/NewsList";
import Category from "../components/news/category";
import FilterSearchSkeleton from "../components/common/skeleton/news/FilterSearchSkeleton";
import { newsAPI } from "../api/news";

export default function News() {
  const [isLoading, setIsLoading] = useState(true);
  const [newsData, setNewsData] = useState<NewsType[]>([]);
  const [text, setText] = useState("");
  const [cursor, setCursor] = useState<number | null>(null);
  const observerRef = useRef<HTMLDivElement>(null);
  const [currentSearchTerm, setCurrentSearchTerm] = useState("");
  const [currentSort, setCurrentSort] = useState<"LATEST" | "POPULAR">(
    "LATEST"
  );

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      fetchAllNews(currentSort, true);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const fetchAllNews = async (
    sort?: "LATEST" | "POPULAR",
    isNewSearch: boolean = false
  ) => {
    try {
      let newsResults;
      const actualSort = sort || currentSort;

      if (isNewSearch) {
        setCursor(null);
        setCurrentSearchTerm(text);
        setCurrentSort(actualSort);
      }

      if (cursor && !isNewSearch) {
        newsResults = await newsAPI.getAllNews(
          actualSort,
          currentSearchTerm,
          cursor
        );
      } else {
        newsResults = await newsAPI.getAllNews(
          actualSort,
          isNewSearch ? text : currentSearchTerm
        );
      }

      if (newsResults.data.content) {
        if (isNewSearch) {
          setNewsData(newsResults.data.content);
        } else {
          setNewsData((previousNews) => [
            ...previousNews,
            ...newsResults.data.content,
          ]);
        }

        if (newsResults.data.content.length > 0) {
          setCursor(
            newsResults.data.content[newsResults.data.content.length - 1].id
          );
        } else {
          setCursor(null);
        }
      }

      console.log(newsData);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    fetchAllNews();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const firstEntry = entries[0];
      if (firstEntry.isIntersecting && !isLoading) {
        fetchAllNews(currentSort, false);
      }
    });
    if (observerRef.current) observer.observe(observerRef.current);
    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [currentSort]);

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
                  onChange={onChange}
                  onKeyDown={handleKeyDown}
                />
                <button
                  onClick={() => {
                    fetchAllNews(currentSort, true);
                  }}
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
          {isLoading ? <NewsSkeleton /> : <NewsList newsData={newsData} />}
          <div
            className="w-full h-20 border border-black border-solid"
            ref={observerRef}
          >
            <button
              className="w-full h-full"
              onClick={() => {
                if (cursor) fetchAllNews(currentSort, false);
              }}
            >
              더보기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
