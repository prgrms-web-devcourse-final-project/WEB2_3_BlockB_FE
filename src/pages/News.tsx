import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import search from "../assets/icons/search.svg";
import NewsSkeleton from "../components/common/skeleton/news/NewsSkeleton";
import NewsList from "../components/news/NewsList";
import Category from "../components/news/category";
import FilterSearchSkeleton from "../components/common/skeleton/news/FilterSearchSkeleton";

// 뉴스 데이터 타입 정의
type NewsItem = {
  newsId: number;
  newsTitle: string;
  newsContent: string;
  newsImgUrl: string;
  newsType: string;
  deliveryTime: string;
};

export default function News() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<1 | 2>(1); // 1: 최신순, 2: 인기순
  const [isLoading, setIsLoading] = useState(true);
  const [newsData, setNewsData] = useState<NewsItem[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setNewsData([
        {
          newsId: 1,
          newsTitle: "미국-인도 정상회담 개최",
          newsContent:
            "조 바이든 미국 대통령과 나렌드라 모디 인도 총리가 워싱턴 D.C.에서 정상회담을 갖고 경제 및 안보 협력 강화 방안을 논의했습니다.",
          newsImgUrl:
            "https://img1.yna.co.kr/photo/yna/YH/2025/02/17/PYH2025021704480001300_P4.jpg",
          newsType: "연합뉴스",
          deliveryTime: "2025-02-17T15:07:00Z",
        },
        {
          newsId: 1,
          newsTitle: "미국-인도 정상회담 개최",
          newsContent:
            "조 바이든 미국 대통령과 나렌드라 모디 인도 총리가 워싱턴 D.C.에서 정상회담을 갖고 경제 및 안보 협력 강화 방안을 논의했습니다.",
          newsImgUrl:
            "https://img1.yna.co.kr/photo/yna/YH/2025/02/17/PYH2025021704480001300_P4.jpg",
          newsType: "연합뉴스",
          deliveryTime: "2025-02-17T15:07:00Z",
        },
        {
          newsId: 1,
          newsTitle: "미국-인도 정상회담 개최",
          newsContent:
            "조 바이든 미국 대통령과 나렌드라 모디 인도 총리가 워싱턴 D.C.에서 정상회담을 갖고 경제 및 안보 협력 강화 방안을 논의했습니다.",
          newsImgUrl:
            "https://img1.yna.co.kr/photo/yna/YH/2025/02/17/PYH2025021704480001300_P4.jpg",
          newsType: "연합뉴스",
          deliveryTime: "2025-02-17T15:07:00Z",
        },
        {
          newsId: 1,
          newsTitle: "미국-인도 정상회담 개최",
          newsContent:
            "조 바이든 미국 대통령과 나렌드라 모디 인도 총리가 워싱턴 D.C.에서 정상회담을 갖고 경제 및 안보 협력 강화 방안을 논의했습니다.",
          newsImgUrl:
            "https://img1.yna.co.kr/photo/yna/YH/2025/02/17/PYH2025021704480001300_P4.jpg",
          newsType: "연합뉴스",
          deliveryTime: "2025-02-17T15:07:00Z",
        },
        {
          newsId: 1,
          newsTitle: "미국-인도 정상회담 개최",
          newsContent:
            "조 바이든 미국 대통령과 나렌드라 모디 인도 총리가 워싱턴 D.C.에서 정상회담을 갖고 경제 및 안보 협력 강화 방안을 논의했습니다.",
          newsImgUrl:
            "https://img1.yna.co.kr/photo/yna/YH/2025/02/17/PYH2025021704480001300_P4.jpg",
          newsType: "연합뉴스",
          deliveryTime: "2025-02-17T15:07:00Z",
        },
        {
          newsId: 1,
          newsTitle: "미국-인도 정상회담 개최",
          newsContent:
            "조 바이든 미국 대통령과 나렌드라 모디 인도 총리가 워싱턴 D.C.에서 정상회담을 갖고 경제 및 안보 협력 강화 방안을 논의했습니다.",
          newsImgUrl:
            "https://img1.yna.co.kr/photo/yna/YH/2025/02/17/PYH2025021704480001300_P4.jpg",
          newsType: "연합뉴스",
          deliveryTime: "2025-02-17T15:07:00Z",
        },
      ]);
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="w-full h-screen overflow-hidden font-pretendard">
      <div className="max-w-10xl mx-auto p-6 flex flex-col md:flex-row md:pr-0 md:gap-6 h-full overflow-auto">
        {/* 카테고리 */}
        <div className="w-full md:w-1/6 md:ml-3 order-1 md:order-1">
          <Category />
        </div>

        <div className="md:w-5/6 overflow-auto md:mr-3 order-2 md:order-2">
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
                    navigate(`/news`);
                    setStatus(1);
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
                    navigate(`/news`);
                    setStatus(2);
                  }}
                >
                  인기순
                </button>
              </div>

              {/* 검색 바 */}
              <div className="relative mt-3 w-full">
                <input
                  type="text"
                  className="border rounded-lg px-2 py-2 w-full pl-3 pr-10 focus:outline-none"
                  placeholder="검색..."
                />
                <img
                  src={search}
                  alt="검색 아이콘"
                  className="absolute right-3 top-3 w-5 h-5 text-gray-500"
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
